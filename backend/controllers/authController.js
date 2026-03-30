/**
 * Authentication Controller
 * Handles user registration, login, and authentication logic
 */

import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import crypto from 'crypto';
import sendEmail from '../utils/emailService.js';

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    throw new AppError('Veuillez remplir tous les champs obligatoires', 400);
  }

  if (password !== confirmPassword) {
    throw new AppError('Les mots de passe ne correspondent pas', 400);
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Cet utilisateur existe déjà', 400);
  }

  // Create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  user.password = undefined;

  res.status(201).json({
    success: true,
    message: 'Utilisateur enregistré avec succès',
    token,
    user,
  });
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new AppError('Veuillez indiquer votre adresse e-mail et votre mot de passe', 400);
  }

  // Find user and select password field
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Email ou mot de passe invalide', 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError('Email ou mot de passe invalide', 401);
  }

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Connexion réussie',
    token,
    user,
  });
});

// Get Current User
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppError('Utilisateur introuvable', 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Déconnecté avec succès',
  });
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, profileImage } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phone: phone || undefined,
      profileImage: profileImage || undefined,
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError('Utilisateur introuvable', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Profil mis à jour avec succès',
    user,
  });
});

// Update Password
export const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new AppError('Please provide all password fields', 400);
  }

  if (newPassword !== confirmPassword) {
    throw new AppError('New passwords do not match', 400);
  }

  // Find user and check old password
  const user = await User.findById(req.user.id).select('+password');
  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    throw new AppError('Old password is incorrect', 401);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});

// Add/Update Address
export const updateAddress = asyncHandler(async (req, res) => {
  const { street, city, state, zipCode, country } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      address: {
        street,
        city,
        state,
        zipCode,
        country,
        isDefault: true,
      },
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Address updated successfully',
    user,
  });
});

// Toggle Wishlist (Add/Remove)
export const toggleWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user.id);

  const isInWishlist = user.wishlist.includes(productId);

  if (isInWishlist) {
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
  } else {
    user.wishlist.push(productId);
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
    wishlist: user.wishlist,
  });
});

// Get Wishlist Products
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist');

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new AppError('Aucun utilisateur trouvé avec cette adresse email', 404);
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  const message = `Vous recevez cet email car vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur ce lien pour le réinitialiser :\n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Réinitialisation du mot de passe',
      message,
    });

    res.status(200).json({ success: true, message: 'Email de réinitialisation envoyé' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new AppError("Erreur lors de l'envoi de l'email", 500);
  }
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Jeton invalide ou expiré', 400);
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Send new JWT token
  const token = generateToken(user._id);
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Mot de passe mis à jour avec succès',
    token,
    user
  });
});
