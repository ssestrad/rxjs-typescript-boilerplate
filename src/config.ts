export default {
  wikipediaApi: {
    base: 'https://en.wikipedia.org/w/api.php',
    searchQuery: 'action=query&format=json&list=search&srsearch={query}',
    imageQuery: 'action=query&prop=pageimages|info&inprop=url&format=json&pageids={pageids}&pithumbsize={thumbsize}',
  },
};
