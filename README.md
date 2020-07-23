# appinternal1

### Android 的发布:

    强烈建议使用 android studio 完成签名打包流程

1. 选择 build，然后选择 generate signed bundle/apk
2. 已经生成了证书就选择 choose,没有就选择 create
3. create 信息填写

   - 证书保存路径为android目录
   - 密码为 liaosir
   - 别名为: android-release
   - key 密码为：liaosir
   - validity 年限为：10000
   - 开发信息随意填

4. 签名后 apk 生成目录为根目录，选择 release
5. 之后打包就可以使用该证书
   首先按照 mobile.md 中的流程运行、打包、签名 app,生成 release.apk 然后上传蒲公英内测平台‘https://www.pgyer.com’，最后上传商店，各个商店及开放平台的登录密码见:https://cloud.wholerengroup.com/f/6157
