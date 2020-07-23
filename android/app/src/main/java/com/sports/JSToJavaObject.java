package com.sports;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.tencent.imsdk.v2.V2TIMGroupInfo;
import com.tencent.imsdk.v2.V2TIMGroupMemberFullInfo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by: yangtao
 * On 2020-07-09
 * Description:
 */
public class JSToJavaObject {

    public static List<String> getReadableArray(ReadableArray array) {
        List<String> list = new ArrayList();
        if (array != null && array.size() > 0) {
            for (int i = 0; i < array.size(); i++) {
                if (ReadableType.Array == array.getType(i)) {
                    list.add(array.getArray(i).toString());
                } else if (ReadableType.Boolean == array.getType(i)) {
                    list.add(String.valueOf(array.getBoolean(i)));
                } else if (ReadableType.Number == array.getType(i)) {
                    list.add(String.valueOf(array.getInt(i)));
                } else if (ReadableType.String == array.getType(i)) {
                    list.add(array.getString(i));
                } else if (ReadableType.Map == array.getType(i)) {
                    list.add(array.getMap(i).toString());
                }
            }
        }
        return list;
    }

    public static V2TIMGroupInfo getV2TIMGroupInfo(ReadableMap info) {
        V2TIMGroupInfo v2TIMGroupInfo = new V2TIMGroupInfo();
        if (info != null) {
            if (info.hasKey("isAllMuted")) v2TIMGroupInfo.setAllMuted(Boolean.getBoolean(info.getString("isAllMuted")));
            if (info.hasKey("faceUrl")) v2TIMGroupInfo.setFaceUrl(info.getString("faceUrl"));
            if (info.hasKey("addOpt")) v2TIMGroupInfo.setGroupAddOpt(Integer.parseInt(info.getString("addOpt")));
            if (info.hasKey("groupID")) v2TIMGroupInfo.setGroupID(info.getString("groupID"));
            if (info.hasKey("groupName")) v2TIMGroupInfo.setGroupName(info.getString("groupName"));
            if (info.hasKey("groupType")) v2TIMGroupInfo.setGroupType(info.getString("groupType"));
            if (info.hasKey("introduction")) v2TIMGroupInfo.setIntroduction(info.getString("introduction"));
            if (info.hasKey("notification")) v2TIMGroupInfo.setNotification(info.getString("notification"));
        }

        return v2TIMGroupInfo;
    }

    public static V2TIMGroupMemberFullInfo getV2TIMGroupMemberFullInfo(ReadableMap info) {
        V2TIMGroupMemberFullInfo v2TIMGroupMemberFullInfo = new V2TIMGroupMemberFullInfo();
        if (info != null) {
            if (info.hasKey("nameCard")) v2TIMGroupMemberFullInfo.setNameCard(info.getString("nameCard"));
            if (info.hasKey("userID")) v2TIMGroupMemberFullInfo.setUserID(info.getString("userID"));
        }

        return v2TIMGroupMemberFullInfo;
    }
}
