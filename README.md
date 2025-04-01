
# ☕ Coffee App

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).  
Coffee is a high-performance coffee ordering app built with **React Redux**, optimized to maintain a **constant 60 FPS** on both the JS and UI threads.  

##📲 Demo Simulator

https://github.com/user-attachments/assets/e733b08e-a82d-47bc-b2a7-5c9ef3f15c7a


## 🚀 Features  

- **🏠 Home Screen** – Browse coffee options with a smooth UI.  
- **📜 Detail Screen** – View coffee details and customize orders (cup size, sugar level, etc.).  
- **🛒 Cart Screen** – Add, update, or remove items from the cart dynamically.  
- **👤 Profile Screen** – Manage user preferences and settings.  
- **⚡ Performance Optimized** – Utilizes **React.memo, useCallback, and code splitting** for smooth rendering.  
- **🎯 Cross-Platform** – Runs on both **iOS and Android**.  

---

# Getting Started  

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.  

## Step 1: Start Metro  

First, you need to start **Metro**, the JavaScript bundler for React Native.  

```sh
# Using npm
npm start

# OR using Yarn
yarn start

Step 2: Build and run the app

With Metro running, open a new terminal window and use one of the following commands:

Android

# Using npm
npm run android

# OR using Yarn
yarn android

iOS

For iOS, ensure you have installed CocoaPods dependencies:

bundle install  # (Only needed on first setup)
bundle exec pod install

Then run:

# Using npm
npm run ios

# OR using Yarn
yarn ios

If everything is set up correctly, the app will run on the Android Emulator, iOS Simulator, or a connected device.

🎯 Optimizations

The Coffee app is optimized for smooth performance and minimal re-renders using:
	•	React.memo – Prevents unnecessary re-renders.
	•	useCallback & useMemo – Optimizes function and value references.
	•	Redux Toolkit – Efficient state management with minimal updates.
	•	Lazy Loading & Code Splitting – Faster initial load times.
	•	Fast Navigation – Uses React Navigation with optimized transitions.

Modifying Your App

Now that the app is running, you can start making changes!

Open App.tsx in your text editor and modify the code. Changes will reflect automatically thanks to Fast Refresh.

To force a full reload:
	•	Android: Press R twice or open the Dev Menu (Ctrl + M on Windows/Linux, Cmd ⌘ + M on macOS).
	•	iOS: Press R in the iOS Simulator.

🎉 Congratulations!

You’ve successfully set up and run the Coffee App! ☕🎉

What’s Next?
	•	Learn about React Native.
	•	Explore Redux Toolkit for advanced state management.
	•	Check out the React Navigation docs.

Troubleshooting

If you run into issues, check out:
	•	React Native Troubleshooting.
	•	React Native GitHub Issues.

Learn More
	•	React Native Website – Learn more about React Native.
	•	Getting Started Guide – Set up your development environment.
	•	Redux Toolkit – Modern Redux for better state management.
	•	React Navigation – Smooth navigation in React Native.

📜 License

This project is MIT licensed.

Feel free to star ⭐ the repo if you like it!
