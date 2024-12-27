export default defineAppConfig({
  pages: [
    "pages/chatPage/index",
    "pages/imagePage/index",
    "pages/giftPage/index",
  ],
  tabBar: {
    color: "#000000",
    selectedColor: "#000000",
    backgroundColor: "#ffffff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/chatPage/index",
        text: "弹幕",
        iconPath: "assets/icons/chat.png",
        selectedIconPath: "assets/icons/chat-fill.png",
      },
      {
        pagePath: "pages/imagePage/index",
        text: "图片",
        iconPath: "assets/icons/image.png",
        selectedIconPath: "assets/icons/image-fill.png",
      },
      {
        pagePath: "pages/giftPage/index",
        text: "礼物",
        iconPath: "assets/icons/gift.png",
        selectedIconPath: "assets/icons/gift-fill.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ffffff",
    navigationBarTitleText: "❤️CYXI❤️",
    navigationBarTextStyle: "black",
    backgroundColor: "#ffffff",
  },
});
