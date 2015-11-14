function extractRecommend($, element) {
  var data = {};

  var matches = $(element).find('a').attr('href').match(/\/(n[0-9a-z]+)\//);
  data['ncode'] = matches[1];

  data['url'] = $(element).find('a').attr('href');
  data['title'] = $(element).find('a .reconovel_title').text();

  $(element).find('li').each(function(index, element){
    switch (index) {
      case 0:
        var matches = $(element).text().match(/.+/);
        data['category'] = matches[0];
        break;

      case 1:
        var matches = $(element).text().match(/(.+)\(全(\d+)部\)/);
        data['state'] = matches[1];
        data['pageCount'] = matches[2];
        break;

      case 2:
        var matches = $(element).text().match(/(\d+) user/);
        data['bookmarkCount'] = matches[1];
        break;

      case 3:
        var matches = $(element).text().match(/最終掲載日：(.+)/)
        data['lastPublishedAt'] = matches[1];
    }
  });

  return data;
}

function extractNovelTop($) {
  var data = {};

  data['title'] = $('.novel_title').text();
  data['author'] = $('.novel_writername a').text();
  var matches = $('.novel_writername a').attr('href').match(/(\d+)/);
  data['authorId'] = matches[1];
  data['outline'] = $('#novel_ex').text();

  var links = [];
  $('.subtitle a').each(function(index, element){
    links.push({
      title: $(element).text(),
      url: $(element).attr('href')
    });
  });

  data['links'] = links;

  return data;
}

function extractNovelInfo($) {
  var data = {};

  data['title'] = $('h1 a').text();
  data['url'] = $('h1 a').attr('href');

  var matches = data['url'].match(/\/(n[0-9a-z]+)\//);
  data['ncode'] = matches[1];

  var matches = $('#pre_info').text().match(/(連載中|完結済)全(\d+)部/);
  data['state'] = matches[1];
  data['pageCount'] = matches[2];

  $('#noveltable1 td').each(function(index, element){
    switch (index) {
      case 0:
        data['outline'] = $(element).text();
        break;

      case 1:
        var target = $(element).find('a');
        data['author'] = target.text();
        var matches = target.attr('href').match(/(\d+)/);
        data['authorId'] = matches[1];
        break;

      case 2:
        data['keywords'] = $(element).text().replace(/\n/g, '').replace(/\s/g, ',');
        break;

      case 3:
        var matches = $(element).text().match(/.+/);
        data['category'] = matches[0];
        break;
    }
  });

  $('#noveltable2 td').each(function(index, element){
    switch (index) {
      case 0:
        data['publishedAt'] = $(element).text();
        break;

      case 1:
        data['lastPublishedAt'] = $(element).text();
        break;

      case 2:
        var matches = $(element).text().match(/([\d,]+)/);
        data['impressionCount'] = matches[1].replace(/,/g, '');
        break;

      case 3:
        var matches = $(element).text().match(/([\d,]+)/);
        data['reviewCount'] = matches[1].replace(/,/g, '');
        break;

      case 4:
        var matches = $(element).text().match(/([\d,]+)/);
        data['bookmarkCount'] = matches[1].replace(/,/g, '');
        break;

      case 5:
        var matches = $(element).text().match(/([\d,]+)/);
        data['totalRating'] = matches[1].replace(/,/g, '');
        break;

      case 6:
        var matches = $(element).text().match(/([\d,]+)pt/g);
        data['compositionRating'] = matches[0].replace(/[,pt]/g, '');
        data['storyRating'] = matches[1].replace(/[,pt]/g, '');
        break;

      case 8:
        var matches = $(element).text().match(/([\d,]+)/);
        data['totalRating'] = matches[1].replace(/,/g, '');
        break;
    }
  });

  return data;
}

module.exports = {
  extractRecommend: extractRecommend,
  extractNovelTop: extractNovelTop,
  extractNovelInfo: extractNovelInfo
};

