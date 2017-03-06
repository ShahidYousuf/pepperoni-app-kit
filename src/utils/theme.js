const palette = {
  teal: '#39BABD',
  darkTeal: '#2DB1B5',
  lightTeal: '#e1e7e0',
  orange: '#FF7700',
  darkBlue: '#003441',
  grey: '#929292',
  lightGrey: '#D1D1D1',
  sand: '#F2EEE6',
  darkSand: '#efebe3',
  turquoise: '#45BABD',
  turquoiseDark: '#34A3A6',
  white: '#FFFFFF'
};

export const colors = {
  button: palette.white,
  background: palette.turquoise,
  text: palette.white,
  navigation: palette.orange,
  bullet: palette.lightGrey,
  selectedBullet: palette.white,
  tab: palette.turquoiseDark,
  tabText: palette.turquoise,
  selectedTabText: palette.white
};

export const buttons = {
  basic: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  primary: {
    backgroundColor: colors.button
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.button,
    borderWidth: 1
  }
};

export const fonts = {
  h1: {
    fontSize: 40,
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'System'
  },
  h2: {
    fontSize: 28,
    color: colors.text,
    fontFamily: 'System'
  },
  h3: {
    fontSize: 20,
    color: colors.text,
    fontFamily: 'System'
  },
  body: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'System'
  },
  button: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System'
  },
  primary: {
    color: colors.background
  },
  secondary: {
    color: colors.button
  }
};
