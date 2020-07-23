package com.sports;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.tencent.imsdk.v2.V2TIMGroupInfo;
import com.tencent.imsdk.v2.V2TIMGroupInfoResult;
import com.tencent.imsdk.v2.V2TIMGroupMemberFullInfo;
import com.tencent.imsdk.v2.V2TIMGroupMemberInfo;
import com.tencent.imsdk.v2.V2TIMGroupMemberInfoResult;
import com.tencent.imsdk.v2.V2TIMGroupMemberOperationResult;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by: yangtao
 * On 2020-07-09
 * Description:
 * @author yigit
 */
public class JavaToJSObject {

    public static WritableMap getV2TIMGroupInfo(V2TIMGroupInfo info) {

        WritableMap data = Arguments.createMap();

        if (info != null) {
            data.putString("groupID", info.getGroupID());
            data.putString("groupType", info.getGroupType());
            data.putString("groupName", info.getGroupName());
            data.putString("notification", info.getNotification());
            data.putString("introduction", info.getIntroduction());
            data.putString("faceUrl", info.getFaceUrl());
            data.putString("isAllMuted", String.valueOf(info.isAllMuted()));
            data.putString("owner", info.getOwner());
            data.putString("createTime", String.valueOf(info.getCreateTime()));
            data.putString("addOpt", String.valueOf(info.getGroupAddOpt()));
            data.putString("lastInfoTime", String.valueOf(info.getLastInfoTime()));
            data.putString("lastMessageTime", String.valueOf(info.getLastMessageTime()));
            data.putString("memberCount", String.valueOf(info.getMemberCount()));
            data.putString("onlineCount", String.valueOf(info.getOnlineCount()));
            data.putString("role", String.valueOf(info.getRole()));
            data.putString("recvOpt", String.valueOf(info.getRecvOpt()));
            data.putString("joinTime", String.valueOf(info.getJoinTime()));
        }


        return data;
    }

    public static WritableMap getV2TIMGroupInfoResult(V2TIMGroupInfoResult info) {

        WritableMap data = Arguments.createMap();

        if (info != null) {
            data.putString("resultCode", String.valueOf(info.getResultCode()));
            data.putString("resultMessage", info.getResultMessage());
            if (info.getGroupInfo() != null) {
                data.putMap("V2TIMGroupInfo", getV2TIMGroupInfo(info.getGroupInfo()));
            } else {
                data.putString("V2TIMGroupInfo", "null");
            }
        }


        return data;
    }

    public static WritableMap getV2TIMGroupMemberInfoResult(V2TIMGroupMemberInfoResult info) {
        WritableMap data = Arguments.createMap();

        if (info != null) {
            data.putString("nextSeq", String.valueOf(info.getNextSeq()));
            List<V2TIMGroupMemberFullInfo> list = info.getMemberInfoList();
            if (list != null && list.size() > 0) {
                WritableArray array = Arguments.createArray();
                for (V2TIMGroupMemberFullInfo obj : list) {
                    array.pushMap(getV2TIMGroupMemberFullInfo(obj));
                }
                data.putArray("list", array);
            }
        }

        return data;
    }

    public static WritableMap getV2TIMGroupMemberFullInfo(V2TIMGroupMemberFullInfo info) {
        WritableMap data = Arguments.createMap();

        if (info != null) {
            data.putString("userID", info.getUserID());
            data.putString("faceUrl", info.getFaceUrl());
            data.putString("friendRemark", info.getFriendRemark());
            data.putString("nameCard", info.getNameCard());
            data.putString("joinTime", String.valueOf(info.getJoinTime()));
            data.putString("muteUntil", String.valueOf(info.getMuteUntil()));
            data.putString("role", String.valueOf(info.getRole()));
            data.putString("nickName", info.getNickName());
        }

        return data;
    }

    public static WritableMap getV2TIMGroupMemberInfo(V2TIMGroupMemberInfo info) {
        WritableMap data = Arguments.createMap();

        if (info != null) {
            data.putString("faceUrl", info.getFaceUrl());
            data.putString("friendRemark", info.getFriendRemark());
            data.putString("nameCard", info.getNameCard());
            data.putString("nickName", info.getNickName());
            data.putString("userID", info.getUserID());
        }

        return data;
    }

    public static WritableMap getV2TIMGroupMemberOperationResult(V2TIMGroupMemberOperationResult info) {
        WritableMap data = Arguments.createMap();

        if (info != null) {
            data.putString("memberID", info.getMemberID());
            data.putString("result", String.valueOf(info.getResult()));
        }

        return data;
    }




//    public static Map<String,String> obj2Map(Object obj) {
//        Map<String,String> map =new HashMap<String, String>();
//        Field[] fields = obj.getClass().getDeclaredFields();
//        for(int i = 0;i < fields.length;i++){
//            String varName = fields[i].getName();
//            try{
//                boolean accessFlag = fields[i].isAccessible();
//                fields[i].setAccessible(true);
//                Object o = fields[i].get(obj);
//                if(o != null){
//                    map.put(varName, o.toString());
//                }
//                fields[i].setAccessible(accessFlag);
//            }catch(IllegalArgumentException ex){
////                logger.error("obj2Map err!", ex);
//            }catch(IllegalAccessException ex){
////                logger.error("obj2Map err!",ex);
//            }
//        }
//        return map;
//    }
//
//    public static Object map2Obj(Map<String,String> map, Class<?> beanClass) {
//        if(map == null || map.isEmpty()){
//            return null;
//        }
//        Object obj = null;
//        try{
//            obj = beanClass.newInstance();
//            Field[] fields = obj.getClass().getDeclaredFields();
//            for(Field field : fields){
//                int mod = field.getModifiers();
//                if(Modifier.isStatic(mod) || Modifier.isFinal(mod)){
//                    continue;
//                }
//                field.setAccessible(true);
//                field.set(obj, map.get(field.getName()));
//            }
//        }catch(Exception e){
////            logger.error("map2Obj err!", e);
//        }
//        return obj;
//    }



}
