package com.sports;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tencent.imsdk.v2.V2TIMCallback;
import com.tencent.imsdk.v2.V2TIMGroupInfo;
import com.tencent.imsdk.v2.V2TIMGroupInfoResult;
import com.tencent.imsdk.v2.V2TIMGroupMemberFullInfo;
import com.tencent.imsdk.v2.V2TIMGroupMemberInfo;
import com.tencent.imsdk.v2.V2TIMGroupMemberInfoResult;
import com.tencent.imsdk.v2.V2TIMGroupMemberOperationResult;
import com.tencent.imsdk.v2.V2TIMManager;
import com.tencent.imsdk.v2.V2TIMMessage;
import com.tencent.imsdk.v2.V2TIMSDKConfig;
import com.tencent.imsdk.v2.V2TIMSDKListener;
import com.tencent.imsdk.v2.V2TIMSimpleMsgListener;
import com.tencent.imsdk.v2.V2TIMUserInfo;
import com.tencent.imsdk.v2.V2TIMValueCallback;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by: yangtao
 * On 2020-07-08
 * Description:
 */
public class TXIMModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext mContext;
    private SimpleMsgListener mSimpleMsgListener;

    public TXIMModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mSimpleMsgListener = new SimpleMsgListener();
        initSimpleMsgListener();
    }

    private void initSimpleMsgListener() {
        Log.i("yangtao", "into initSimpleMsgListener");
        if (mSimpleMsgListener != null) {
            V2TIMManager.getInstance().removeSimpleMsgListener(mSimpleMsgListener);
            V2TIMManager.getInstance().addSimpleMsgListener(mSimpleMsgListener);
        } else {
            Log.e("yangtao", "mSimpleMsgListener == null");
        }
    }

    private static class SimpleMsgListener extends V2TIMSimpleMsgListener {

        @Override
        public void onRecvC2CCustomMessage(String msgID, V2TIMUserInfo sender, byte[] customData) {
            super.onRecvC2CCustomMessage(msgID, sender, customData);
        }

        @Override
        public void onRecvGroupCustomMessage(String msgID, String groupID, V2TIMGroupMemberInfo sender, byte[] customData) {
            super.onRecvGroupCustomMessage(msgID, groupID, sender, customData);
        }

        @Override
        public void onRecvGroupTextMessage(String msgID, String groupID, V2TIMGroupMemberInfo sender, String text) {
            super.onRecvGroupTextMessage(msgID, groupID, sender, text);
            Log.d("yangtao", "SimpleMsgListener onRecvGroupTextMessage: .......text " + text);
            WritableMap map = Arguments.createMap();
            map.putString("msgID", msgID);
            map.putString("groupID", groupID);
            map.putString("text", text);
            map.putMap("V2TIMGroupMemberInfo", JavaToJSObject.getV2TIMGroupMemberInfo(sender));
            sendEvent(mContext, "onRecvGroupTextMessage", map);
        }

        @Override
        public void onRecvC2CTextMessage(String msgID, V2TIMUserInfo sender, String text) {
            super.onRecvC2CTextMessage(msgID, sender, text);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "TXIMBridge";
    }


    /**
     * 初始化 SDK
     *
     * @param sdkAppID
     * @param promise 回调
     */
    @ReactMethod
    public void initSDK(int sdkAppID, Promise promise) {
        V2TIMSDKConfig config = new V2TIMSDKConfig();
        config.setLogLevel(V2TIMSDKConfig.V2TIM_LOG_DEBUG);
        V2TIMManager.getInstance().initSDK(mContext, sdkAppID, config, new V2TIMSDKListener() {
            @Override
            public void onConnecting() {
                // 正在连接到腾讯云服务器
            }
            @Override
            public void onConnectSuccess() {
                // 已经成功连接到腾讯云服务器
                promise.resolve(true);
            }
            @Override
            public void onConnectFailed(int code, String error) {
                // 连接腾讯云服务器失败
                promise.reject(String.valueOf(code), error);
            }
        });
    }

    /**
     * 登陆
     *
     * @param userID 用户标识
     * @param userSig 该用户的userSig
     * @param promise 回调
     */
    @ReactMethod
    public void login(String userID, String userSig, Promise promise) {
        V2TIMManager.getInstance().login(userID, userSig, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 退出登录
     *
     * @param promise 回调
     */
    @ReactMethod
    public void logout(Promise promise) {
        V2TIMManager.getInstance().logout(new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 创建群组
     *
     * @param groupType 群类型
     * @param groupID 群 ID
     * @param groupName 群名称
     * @param promise 回调
     */
    @ReactMethod
    public void createGroup(String groupType, String groupID, String groupName, Promise promise) {
        V2TIMManager.getInstance().createGroup(groupType, groupID, groupName, new V2TIMValueCallback<String>() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess(String s) {
                promise.resolve(s);
            }
        });
    }

    /**
     * 加入群组
     *
     * @param var1 群 ID
     * @param var2 申请消息内容
     * @param promise 回调
     */
    @ReactMethod
    public void joinGroup(String var1, String var2, Promise promise) {
        V2TIMManager.getInstance().joinGroup(var1, var2, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 退出群组
     *
     * @param var1 群 ID
     * @param promise 回调
     */
    @ReactMethod
    public void quitGroup(String var1, Promise promise) {
        V2TIMManager.getInstance().quitGroup(var1, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 解散群组
     *
     * @param var1 群 ID
     * @param promise 回调
     */
    @ReactMethod
    public void dismissGroup(String var1, Promise promise) {
        V2TIMManager.getInstance().dismissGroup(var1, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 获取当前用户已经加入的群列表
     *
     * @param promise 回调
     */
    @ReactMethod
    public void getJoinedGroupList(Promise promise) {
        V2TIMManager.getGroupManager().getJoinedGroupList(new V2TIMValueCallback<List<V2TIMGroupInfo>>() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess(List<V2TIMGroupInfo> v2TIMGroupInfos) {
                WritableArray list = Arguments.createArray();
                for (V2TIMGroupInfo info : v2TIMGroupInfos) {
                    WritableMap data = JavaToJSObject.getV2TIMGroupInfo(info);
                    list.pushMap(data);
                }
                promise.resolve(list);
            }
        });
    }

    /**
     * 拉取群资料
     *
     * @param groupIDList 群 ID 列表
     * @param promise 回调
     */
    @ReactMethod
    public void getGroupsInfo(ReadableArray groupIDList, Promise promise) {
        List<String> list = JSToJavaObject.getReadableArray(groupIDList);
        V2TIMManager.getGroupManager().getGroupsInfo(list, new V2TIMValueCallback<List<V2TIMGroupInfoResult>>() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess(List<V2TIMGroupInfoResult> v2TIMGroupInfoResults) {
                WritableArray list = Arguments.createArray();
                for (V2TIMGroupInfoResult info : v2TIMGroupInfoResults) {
                    WritableMap data = JavaToJSObject.getV2TIMGroupInfoResult(info);
                    list.pushMap(data);
                }
                promise.resolve(list);
            }
        });
    }

    /**
     * 修改群资料
     *
     * @param info 群信息
     * @param promise 回调
     */
    @ReactMethod
    public void setGroupInfo(ReadableMap info, Promise promise) {
        V2TIMGroupInfo v2TIMGroupInfo = JSToJavaObject.getV2TIMGroupInfo(info);
        V2TIMManager.getGroupManager().setGroupInfo(v2TIMGroupInfo, new V2TIMCallback() {
            @Override
            public void onError(int code, String desc) {
                promise.reject(String.valueOf(code), desc);
            }
            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 修改群消息接收选项
     *
     * @param var1 群 ID
     * @param var2 三种类型的消息接收选项
     *   0: 在线正常接收消息，离线时会有 APNs 推送。
     *   1: 不会接收到群消息。
     *   2: 在线正常接收消息，离线不会有推送通知。
     * @param promise 回调
     */
    @ReactMethod
    public void setReceiveMessageOpt(String var1, int var2, Promise promise) {
        V2TIMManager.getGroupManager().setReceiveMessageOpt(var1, var2, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 获取群成员列表
     *
     * @param var1 群 ID
     * @param var2 指定群成员类型
     *  0: 全部成员
     *  1: 群主
     *  4: 管理员
     *  8: 普通成员
     * @param var3 分页拉取标志，第一次拉取填0，回调成功如果 nextSeq 不为零，需要分页，传入再次拉取，直至为 0。
     * @param promise 回调
     */
    @ReactMethod
    public void getGroupMemberList(String var1, int var2, int var3, Promise promise) {
        WritableMap map = Arguments.createMap();
        V2TIMManager.getGroupManager().getGroupMemberList(var1, var2, var3, new V2TIMValueCallback<V2TIMGroupMemberInfoResult>() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess(V2TIMGroupMemberInfoResult v2TIMGroupMemberInfoResult) {
                promise.resolve(JavaToJSObject.getV2TIMGroupMemberInfoResult(v2TIMGroupMemberInfoResult));
            }
        });
    }

    /**
     * 获取指定的群成员资料
     *
     * @param var1 群 ID
     * @param var2 一个或多个用户ID
     * @param promise 回调
     */
    @ReactMethod
    public void getGroupMembersInfo(String var1, ReadableArray var2, Promise promise) {
        List<String> list = JSToJavaObject.getReadableArray(var2);
        V2TIMManager.getGroupManager().getGroupMembersInfo(var1, list, new V2TIMValueCallback<List<V2TIMGroupMemberFullInfo>>() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess(List<V2TIMGroupMemberFullInfo> v2TIMGroupMemberFullInfos) {
                WritableArray list = Arguments.createArray();
                if (v2TIMGroupMemberFullInfos != null && v2TIMGroupMemberFullInfos.size() > 0) {
                    for (V2TIMGroupMemberFullInfo info : v2TIMGroupMemberFullInfos) {
                        list.pushMap(JavaToJSObject.getV2TIMGroupMemberFullInfo(info));
                    }
                }

                promise.resolve(list);
            }
        });
    }

    /**
     * 修改指定的群成员资料
     *
     * @param var1 群 ID
     * @param var2 群成员信息
     * @param promise 回调
     */
    @ReactMethod
    public void setGroupMemberInfo(String var1, ReadableMap var2, Promise promise) {
        V2TIMGroupMemberFullInfo v2TIMGroupMemberFullInfo = JSToJavaObject.getV2TIMGroupMemberFullInfo(var2);
        V2TIMManager.getGroupManager().setGroupMemberInfo(var1, v2TIMGroupMemberFullInfo, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 修改指定的群成员资料
     *
     * @param groupID 群 ID
     * @param userID 用户ID
     * @param seconds 时间
     * @param promise 回调
     */
    @ReactMethod
    public void muteGroupMember(String 	groupID,
                                String 	userID,
                                int 	seconds,
                                Promise promise ) {
        V2TIMManager.getGroupManager().muteGroupMember(groupID, userID, seconds, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 修改指定的群成员资料
     *
     * @param groupID 群 ID
     * @param memberList 用户ID集合
     * @param reason 原因
     * @param promise 回调
     */
    @ReactMethod
    public void kickGroupMember(String 	groupID,
                                ReadableArray 	memberList,
                                String 	reason,
                                Promise promise) {
        List<String> list = JSToJavaObject.getReadableArray(memberList);
        V2TIMManager.getGroupManager().kickGroupMember(groupID, list, reason, new V2TIMValueCallback<List<V2TIMGroupMemberOperationResult>>() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess(List<V2TIMGroupMemberOperationResult> v2TIMGroupMemberOperationResults) {
                WritableArray list = Arguments.createArray();
                if (v2TIMGroupMemberOperationResults != null && v2TIMGroupMemberOperationResults.size() > 0) {
                    for (V2TIMGroupMemberOperationResult info: v2TIMGroupMemberOperationResults) {
                        list.pushMap(JavaToJSObject.getV2TIMGroupMemberOperationResult(info));
                    }
                }
                promise.resolve(list);
            }
        });
    }

    /**
     * 切换群成员的角色
     *
     * @param groupID 群 ID
     * @param userID 用户ID
     * @param role 角色
     * @param promise 回调
     */
    @ReactMethod
    public void setGroupMemberRole(String 	groupID,
                                   String 	userID,
                                   int 	role,
                                   Promise 	promise ) {
        V2TIMManager.getGroupManager().setGroupMemberRole(groupID, userID, role, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 转让群主
     *
     * @param groupID 群 ID
     * @param userID 用户ID
     * @param promise 回调
     */
    @ReactMethod
    public void transferGroupOwner(String 	groupID,
                                   String 	userID,
                                   Promise 	promise ) {
        V2TIMManager.getGroupManager().transferGroupOwner(groupID, userID, new V2TIMCallback() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }

            @Override
            public void onSuccess() {
                promise.resolve(true);
            }
        });
    }

    /**
     * 发送群聊普通文本消息（最大支持 8KB）
     *
     * @param text 文本消息
     * @param groupID 群ID
     * @param priority 消息的优先级
     * @param promise 回调
     */
    @ReactMethod
    public void sendGroupTextMessage(String 	text,
                                     String 	groupID,
                                     int 	priority,
                                     Promise 	promise) {
        V2TIMManager.getInstance().sendGroupTextMessage(text, groupID, priority, new V2TIMValueCallback<V2TIMMessage>() {
            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);

            }

            @Override
            public void onSuccess(V2TIMMessage v2TIMMessage) {
                promise.resolve(true);
            }
        });
    }

    /**
     * 发送群聊普通文本消息（最大支持 8KB）
     *
     * @param promise 回调
     */
    @ReactMethod
    public void addSimpleMsgListener(Promise promise) {
        V2TIMManager.getInstance().addSimpleMsgListener(new V2TIMSimpleMsgListener() {
            @Override
            public void onRecvC2CTextMessage(String msgID, V2TIMUserInfo sender, String text) {
                super.onRecvC2CTextMessage(msgID, sender, text);
            }

            @Override
            public void onRecvC2CCustomMessage(String msgID, V2TIMUserInfo sender, byte[] customData) {
                super.onRecvC2CCustomMessage(msgID, sender, customData);
            }

            @Override
            public void onRecvGroupTextMessage(String msgID, String groupID, V2TIMGroupMemberInfo sender, String text) {
                Log.d("yangtao", "addSimpleMsgListener onRecvGroupTextMessage: text " + text);
                super.onRecvGroupTextMessage(msgID, groupID, sender, text);
            }

            @Override
            public void onRecvGroupCustomMessage(String msgID, String groupID, V2TIMGroupMemberInfo sender, byte[] customData) {
                super.onRecvGroupCustomMessage(msgID, groupID, sender, customData);
            }
        });
    }

    private static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

}
