export function offerModel(data) {
  let { offer_list, top_offers } = data;
  return [...top_offers, ...offer_list];
}
export function activityModel(data) {
  let { news_list, top_news } = data;
  return [...top_news, ...news_list];
}
