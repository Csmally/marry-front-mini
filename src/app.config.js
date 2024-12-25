export default defineAppConfig({
  pages: ["pages/home/index", "pages/mine/index"],
  tabBar: {
    color: "#000000",
    selectedColor: "#f987b2",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fdb9d7",
    navigationBarTitleText: "❤️CYXI❤️",
    navigationBarTextStyle: "white",
    backgroundColor: "#ffffff",
  },
});
