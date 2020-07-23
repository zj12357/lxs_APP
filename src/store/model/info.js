export function letterModel(data) {
  let newData = data.map(i => {
    return {
      ...i,
      icon: false,
    };
  });
  let letterArr = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  return letterArr.map(letter => {
    return newData.filter((item, index) => {
      return item.letter === letter;
    });
  });
}

export function sportInfoListModel(data) {
  let category = [];
  data.forEach(item => {
    if (!category.includes(item.teamName)) {
      category.push(item.teamName);
    }
  });

  let returnData = [];
  category.forEach(cat => {
    let itemData = data.filter(d => {
      return d.teamName === cat;
    });
    itemData[0].isTop = true;
    returnData = [].concat(...returnData, ...itemData);
  });
  return returnData;
}
export function profileModel(data) {
  return data.map((item, index) => {
    return {
      name: item.full_name || '--',
      location: item.current_area || '--',
      phone: item.student_phone || '--',
      email: item.student_email_id || '--',
      wechat: item.student_wechat || '--',
      gender: '',

      school: item.current_school || '--',
      grade: item.current_grade || '--',
    };
  });
}
