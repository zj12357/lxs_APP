export function paylinkModel(data) {
  return data.map((item, index) => {
    return {
      ...item,
      key: new Date() + index,
      data: item.items
    };
  });
}
export function complaintModel(data) {
  return data.map((item, index) => {
    return {
      ...item,
      name: item.name,
      des: item.description,
      images: item.attachments
    };
  });
}
export function feedbackModel(data) {
  return data.map((item, index) => {
    return {
      ...item,
      name: item.name,
      des: item.detail,
      images: item.attachments
    };
  });
}
export function feedbackRecordModel(data) {
  return data.map((item, index) => {
    return {
      ...item,
      name: item.name,
      des: item.detail,
      images: item.attachments
    };
  });
}
