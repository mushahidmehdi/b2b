import {authRole} from 'shared/constants/AppConst';

// export const getUserFromAuth0 = (user) => {
//   if (user)
//     return {
//       id: 1,
//       uid: user.sub,
//       displayName: user.name,
//       email: user.email,
//       photoURL: user.picture,
//       role: authRole.user,
//     };
//   return user;
// };

// export const getUserFromFirebase = (user) => {
//   if (user)
//     return {
//       id: 1,
//       uid: user.uid,
//       displayName: user.displayName ? user.displayName : 'Crema User',
//       email: user.email,
//       photoURL: user.photoURL ? user.photoURL : '/assets/images/avatar/A11.jpg',
//       role: authRole.user,
//     };
//   return user;
// };
// export const getUserFromAWS = (user) => {
//   if (user)
//     return {
//       id: 1,
//       uid: user.username,
//       displayName: user.attributes.name ? user.attributes.name : 'Crema User',
//       email: user.attributes.email,
//       photoURL: user.photoURL,
//       role: authRole.user,
//     };
//   return user;
// };

export const getUserFromJwtAuth = (user) => {
  // console.log('User data from AuthHelp Page', user);
  if (user)
    return {
      id: 1,
      uid: user.id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Username: user.Username,
      email: user.Email,
      photoURL: user.avatar,
      role: authRole.user,
    };
  return user;
};
