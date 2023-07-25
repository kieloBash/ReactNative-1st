export const spacing = {
  s: 5,
  m: 8,
  l: 12,
  xl: 15,
};
export const size = {
  sm_btn: 48,
  md_btn: 60,
  icon: 30,
  sm_icon: 22,
  xs: 18,
  s: 24,
  m: 28,
  l: 32,
  xl: 36,

  xs_text: 14,
  sm_text: 18,
  md_text: 24,
  lg_text: 28,
  xl_text: 32,
};
export const radius = {
  s: 8,
  m: 14,
  l: 20,
  xl: 25,
};
export const colors = {
  lightPink: "#eb7f6b",
  bg: "#F0F2F5",
  pinkBg: "#f1e0dd",
  black: "#373737",
  lightBlack: "#5a5a5a",
  confirmed: "#7fe46f",
  confirmedText: "#317526",
  pending: "#ede311",
  pendingText: "#a3910f",
};
export const formatDate = (date) => {
  const options = {
    month: "long",
    day: "2-digit",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
