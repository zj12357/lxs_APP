//
//  TXIMBridge.h
//  Sports
//
//  Created by Evol on 2020/7/5.
//  WeChat iTaster
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "V2TIMManager.h"
#import "V2TIMManager+Group.h"

NS_ASSUME_NONNULL_BEGIN

@interface TXIMBridge : RCTEventEmitter <RCTBridgeModule, V2TIMSDKListener, V2TIMSimpleMsgListener>

@end

NS_ASSUME_NONNULL_END
