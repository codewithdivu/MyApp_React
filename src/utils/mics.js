export const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'User not found. Please check your email or sign up for an account.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please enter a valid email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'Email is already in use. Please use a different email or sign in.';
    case 'auth/weak-password':
      return 'Weak password. Password should be at least 6 characters long.';
    default:
      return 'An error occurred. Please try again later.';
  }
};

export const createChapters = (noOfChapters = 9) =>
  Array(noOfChapters)
    .fill(1)
    .map((_, index) => ({ label: `Chapter ${index + 1}`, value: `chapter${index + 1}` }));
