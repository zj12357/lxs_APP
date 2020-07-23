//
//  TXIMBridge.m
//  Sports
//
//  Created by Evol on 2020/7/5.
//  WeChat iTaster
//

#import "TXIMBridge.h"
#import "NSObject+Utils.h"

@implementation TXIMBridge

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[
    @"onConnecting",
    @"onConnectSuccess",
    @"onConnectFailed",
    @"onRecvGroupTextMessage",
  ];
}

- (void)onConnecting {
  [self sendEventWithName:@"onConnecting" body:@{@"msg": @"正在连接到腾讯云服务器"}];
}
- (void)onConnectSuccess {
  [self sendEventWithName:@"onConnectSuccess" body:@{@"msg": @"已经成功连接到腾讯云服务器"}];
}
- (void)onConnectFailed:(int)code err:(NSString*)err {
  [self sendEventWithName:@"onConnectFailed" body:@{@"code": @(code), @"msg": err}];
}
- (void)onRecvGroupTextMessage:(NSString *)msgID groupID:(NSString *)groupID sender:(V2TIMGroupMemberInfo *)info text:(NSString *)text {
  [self sendEventWithName:@"onRecvGroupTextMessage" body:@{@"msgID": msgID, @"groupID": groupID, @"userInfo": info.toDictionary, @"text": text}];
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone {
  static TXIMBridge *imInst = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    imInst = [super allocWithZone:zone];
  });
  return imInst;
}

#pragma mark -
/*
 初始化
 */
RCT_EXPORT_METHOD(initSDK:(int)appID resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  TXIMBridge *tximBridge = [TXIMBridge new];
  V2TIMSDKConfig *config = [V2TIMSDKConfig new];
  config.logLevel = V2TIM_LOG_INFO;
  BOOL result = [[V2TIMManager sharedInstance] initSDK:appID config:config listener:tximBridge];
  if (result) {
    [[V2TIMManager sharedInstance] addSimpleMsgListener:tximBridge];
    resolve(@(0));
  }
  else {
    reject([@(-1) stringValue], @"SDK初始化失败", nil);
  }
}

/*
 登录
 userID: 用户ID
 userSig: 用户签名服务器生成
 */
RCT_EXPORT_METHOD(login:(NSString *)userID userSig:(NSString *)userSig resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] login:userID userSig:userSig succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
 登出
 */
RCT_EXPORT_METHOD(logout:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] logout:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
创建群组
groupInfo: 群组信息
 {
   allMuted: false,
   faceURL: "",
   groupID: "",
   groupName: "",
   groupType: "",
   introduction: "",
   notification: ""
 }
*/
RCT_EXPORT_METHOD(createGroup:(NSDictionary *)groupInfo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  V2TIMGroupInfo *info = [[V2TIMGroupInfo alloc] init];
  [info setValuesForKeysWithDictionary:groupInfo];
  [[V2TIMManager sharedInstance] createGroup:info memberList:nil succ:^(NSString *groupID) {
    resolve(groupID);
  } fail:^(int code, NSString *msg) {
    reject([@(code) stringValue], msg, nil);
  }];
}

/*
 加入群组
 groupID: 群组ID
 msg: 加入消息
 */
RCT_EXPORT_METHOD(joinGroup:(NSString *)groupID msg:(NSString *)msg resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] joinGroup:groupID msg:msg succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
 退出群组
 groupID: 群组ID
 */
RCT_EXPORT_METHOD(quitGroup:(NSString *)groupID resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] quitGroup:groupID succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
 解散群组
 groupID: 群组ID
 */
RCT_EXPORT_METHOD(dismissGroup:(NSString *)groupID resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] dismissGroup:groupID succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
 获取已加入的群组
 */
RCT_EXPORT_METHOD(getJoinedGroupList:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] getJoinedGroupList:^(NSArray<V2TIMGroupInfo *> *groupList) {
    NSMutableArray *list = [NSMutableArray new];
    for (V2TIMGroupInfo *info in groupList) {
      [list addObject:info.toDictionary];
    }
    resolve(list);
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
 获取群资料
 groupIDs: 一个或多个群组ID
 */
RCT_EXPORT_METHOD(getGroupsInfo:(NSArray *)groupIDs resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] getGroupsInfo:groupIDs succ:^(NSArray<V2TIMGroupInfoResult *> *groupResultList) {
    NSMutableArray *list = [NSMutableArray new];
    for (V2TIMGroupInfoResult *info in groupResultList) {
      [list addObject:info.toDictionary];
    }
    resolve(list);
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
 修改群资料
 groupInfo: 群组信息
  {
    allMuted: false,
    faceURL: "",
    groupID: "",
    groupName: "",
    groupType: "",
    introduction: "",
    notification: ""
  }
 */
RCT_EXPORT_METHOD(setGroupInfo:(NSDictionary *)groupInfo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  V2TIMGroupInfo *info = [[V2TIMGroupInfo alloc] init];
  [info setValuesForKeysWithDictionary:groupInfo];
  [[V2TIMManager sharedInstance] setGroupInfo:info succ:^{
      resolve(@(0));
  } fail:^(int code, NSString *msg) {
      reject([@(code) stringValue], msg, nil);
  }];
}

/*
 设置群消息的接收选项
 groupID: 群ID
 opt: 选项
  0: 在线正常接收消息，离线时会有 APNs 推送。
  1: 不会接收到群消息。
  2: 在线正常接收消息，离线不会有推送通知。
 */
RCT_EXPORT_METHOD(setReceiveMessageOpt:(NSString *)groupID opt:(NSString *)opt resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] setReceiveMessageOpt:groupID opt:[opt intValue] succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
获取群成员列表
groupID: 群ID
filter: 指定群成员类型
 0: 全部成员
 1: 群主
 4: 管理员
 8: 普通成员
nextSeq: 分页拉取标志，第一次拉取填0，回调成功如果 nextSeq 不为零，需要分页，传入再次拉取，直至为 0。
*/
RCT_EXPORT_METHOD(getGroupMemberList:(NSString *)groupID filter:(NSString *)filter nextSeq:(NSString *)nextSeq resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] getGroupMemberList:groupID filter:[filter intValue] nextSeq:[nextSeq intValue] succ:^(uint64_t nextSeq, NSArray<V2TIMGroupMemberFullInfo *> *memberList) {
    NSMutableArray *list = [NSMutableArray new];
    for (V2TIMGroupMemberFullInfo *info in memberList) {
      [list addObject:info.toDictionary];
    }
    resolve(list);
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
获取群成员资料
groupID: 群ID
userIDs: 一个或多个用户ID
*/
RCT_EXPORT_METHOD(getGroupMembersInfo:(NSString *)groupID userIDs:(NSArray *)userIDs resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] getGroupMembersInfo:groupID memberList:userIDs succ:^(NSArray<V2TIMGroupMemberFullInfo *> *memberList) {
    NSMutableArray *list = [NSMutableArray new];
    for (V2TIMGroupMemberFullInfo *info in memberList) {
      [list addObject:info.toDictionary];
    }
    resolve(list);
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
 修改群成员的群名片
 groupID: 群ID
 userID: 用户ID
 nameCard: 群名片
 */
RCT_EXPORT_METHOD(setGroupMemberInfo:(NSString *)groupID userID:(NSString *)userID nameCard:(NSString *)nameCard resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  V2TIMGroupMemberFullInfo *memberInfo = [[V2TIMGroupMemberFullInfo alloc] init];
  memberInfo.userID = userID;
  memberInfo.nameCard = nameCard;
  [[V2TIMManager sharedInstance] setGroupMemberInfo:groupID info:memberInfo succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *msg) {
    reject([@(code) stringValue], msg, nil);
  }];
}

/*
禁言
groupID: 群ID
userID: 用户ID
seconds: 禁言时长
*/
RCT_EXPORT_METHOD(muteGroupMember:(NSString *)groupID userID:(NSString *)userID seconds:(NSString *)seconds resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] muteGroupMember:groupID member:userID muteTime:[seconds intValue] succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
踢人
groupID: 群ID
userIDs: 一个或多个用户ID
reason: 原因
*/
RCT_EXPORT_METHOD(kickGroupMember:(NSString *)groupID userIDs:(NSArray *)userIDs reason:(NSString *)reason resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [[V2TIMManager sharedInstance] kickGroupMember:groupID memberList:userIDs reason:reason succ:^(NSArray<V2TIMGroupMemberOperationResult *> *resultList) {
    NSMutableArray *list = [NSMutableArray new];
    for (V2TIMGroupMemberOperationResult *info in resultList) {
      [list addObject:info.toDictionary];
    }
    resolve(list);
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
切换群成员角色
groupID: 群ID
userID: 用户ID
newRole: 角色
 0: 未定义（没有获取该字段）
 200: 群成员
 300: 群管理员
 400: 群主
*/
RCT_EXPORT_METHOD(setGroupMemberRole:(NSString *)groupID userID:(NSString *)userID newRole:(NSString *)role resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [[V2TIMManager sharedInstance] setGroupMemberRole:groupID member:userID newRole:[role intValue] succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

/*
转让群主
groupID: 群ID
userID: 用户ID
*/
RCT_EXPORT_METHOD(transferGroupOwner:(NSString *)groupID userID:(NSString *)userID resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] transferGroupOwner:groupID member:userID succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
  
}

/*
 向群发送文字消息
 message: 文本内容
 groupID: 群ID
 */
RCT_EXPORT_METHOD(sendGroupTextMessage:(NSString *)message groupID:(NSString *)groupID resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [[V2TIMManager sharedInstance] sendGroupTextMessage:message to:groupID priority:V2TIM_PRIORITY_DEFAULT succ:^{
    resolve(@(0));
  } fail:^(int code, NSString *desc) {
    reject([@(code) stringValue], desc, nil);
  }];
}

@end
