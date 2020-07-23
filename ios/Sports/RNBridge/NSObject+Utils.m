//
//  NSObject+Utils.m
//  Sports
//
//  Created by Evol on 2020/7/5.
//  WeChat iTaster
//

#import "NSObject+Utils.h"
#import <objc/runtime.h>

@implementation NSObject (Utils)

- (NSDictionary *)toDictionary {
  NSMutableDictionary *dict = [NSMutableDictionary dictionary];
  Class cls = [self class];
  while (cls != nil && cls != [NSObject class]) {
    unsigned count;
    objc_property_t *properties = class_copyPropertyList(cls, &count);
    for (int i = 0; i < count; i++) {
      NSString *key = [NSString stringWithUTF8String:property_getName(properties[i])];
      id object = [self valueForKey:key];
      if (object) {
        [dict setObject:object forKey:key];
      }
    }
    free(properties);
    cls = [cls superclass];
  }
  return [NSDictionary dictionaryWithDictionary:dict];
}

@end
