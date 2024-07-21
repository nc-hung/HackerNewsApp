// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   env: {
//     production: {
//       plugins: [
//         'react-native-paper/babel',
//         'react-native-reanimated/plugin',

//       ],
//     },
//   },
//   plugins: [
//     'react-native-reanimated/plugin',
//   ],
// };
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'react-native-paper/babel',  // Đặt ở đây vì không phụ thuộc vào môi trường
  ],
};
