@echo off
echo Sign APK
cd C:\Program Files (x86)\Java\jdk1.7.0_71\bin
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass abgdezetyklmnxoprstifjpo -keystore C:\Users\alsanchez\Desktop\Space-Cardboard\my-release-key.keystore C:\Users\alsanchez\Desktop\Space-Cardboard\platforms\android\build\outputs\apk\android-release-unsigned.apk alias_name
