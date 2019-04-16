'use strict';

function Gallery(horn){
    for (let key in horn){
        this[key]=horn[key];
    }
}

Gallery.allHorns = [];
Gallery.keyword = [];


Gallery.prototype.toHtml = function(){
    let $template =Handlebars.compile($template);
    let compiledTemplate = Handlebars.compile($template);
    return compiledTemplate(this);
};


Gallery.readJson = ($value)=> {
    $.get(`data/${$value}.json`, 'json')
    .then(data=>{
        data.forEach(horn =>{
            Gallery.allHorns.push(new Gallery(horn));
        });
    })

    .then(populateKeywords)
    .then(sortKeywords)
    .then(Gallery.loadHorns)
    .then(Gallery.loadKeywords)
}


function populateKeywords( ){
    Gallery.allHorns.forEach(horn=> {
        if(!Gallery.keyword.includes(horn.keyword)){
            Gallery.keyword.push(horn.keyword)
        }
    })
}

function sortKeyword() {
    Gallery.keyword.sort()

}


Gallery.loadHorns = () =>{
    Gallery.allHorns.forEach(horn => {
        $('#photo-template').append(horn.toHtml())
    });
};


$(() => Gallery.readJson($value));
  let $value = 'page-1';

  Gallery.loadKeyword = () => {

    Gallery.keyword.forEach((keyword)=> {
        $('#filter-key').append(`<option class="filter-remove" value="${keyword}">${keyword}</option`);
    })

  };
 
$('#filter').on('change', function(){
    let $selection = $(this).val();
    $('div').hide();
    $('div[class="${$selection}"]').show();
});



$('#click').on('change', function() {

  $('.filter-remove').remove();

  $('div').remove();

  let $value = $(this).val();

  Gallery.allHorns = [];

  Gallery.keywords = [];

  Gallery.readJson($value);

});




// // for each item in array we will search for keywords. keywords will be linked to keywords in our drop down menu


// // creating a funciton that will creat unique object for our gallery, based on the data it will read from the local json file
// function Gallery(horn) {
//     // linking each attribute to the corresponding value in the json file
//     this.title = horn.title;
//     this.keyword = horn.keyword;
//     this.horns = horn.horns;
//     this.image_url = horn.image_url;
//     this.description = horn.description;
// }

// // once we create the object, we will store them in this array to call through as needed
// Gallery.allhorns=[];



// Gallery.prototype.render = function () {
//     $('main').append('<div class="clone"></div>');
//     let hornClone = $('div[class="clone"]');


//     // we are going to get main from the dom, and inside of main we are going to add in new div elements conatining data from out gallery objects

//     let hornItemHtml = $('#photo-template').html();
// // the copied html pattern is now the skeleton of our newly created horn item div
//     hornClone.html(hornItemHtml);

//     // at this point we will find each element and rewrite it
//     hornClone.find('h2').text(this.title);
//     hornClone.find('img').attr('src', this.image_url);
//     hornClone.find('p').text(this.description);
//     hornClone.attr('class',this.keyword);
//     // hornClone.attr('class','img');
//     hornClone.removeClass('clone');
// }

// // now we need to get the data to run this operation
// Gallery.readJson = () =>{
//     // we get json file form our dir
//     $.get('./page-1.json', 'json')


//         .then(data => {
//             data.forEach(item => {
//                 Gallery.allHorns.push(new Gallery(item));
//             })
//         })

//         .then(Gallery.loadHorns)
//         .then(Gallery.loadKeywords)
//         .then(Gallery.populateFilter)
//         .then(Gallery.handleFilter)

// }


// Gallery.loadHorns = () => {
//     Gallery.allHorns.forEach(horn => horn.render())
// }


// Gallery.loadKeywords = () => {
//     let filterKeywords = [];
//     $('option').not(':first').remove();
//     Gallery.allHorns.forEach(horn => {
//         if (!filterKeywords.includes(horn.keyword))
//         filterKeywords.push(horn.keyword);
//     });

//     let filterkeywords = [];
//     filterkeywords.sort();

//     filterKeywords.forEach(keyword => {
//         let optionTag = `<option value = "${keyword}">${keyword}</option>`;
//         $('select').append(optionTag);
//     });
// }

// Gallery.handleFilter = () => {
//     $('select').on('change', function(){
//         let $selected=$(this).val();
//         console.log('selected is ',$selected);
//         if($selected!== 'default'){

         
            
//             Gallery.allHorns.forEach(horn=>{
                
//                 if($selected===horn.keyword){
//                     console.log($selected);
//                     $('div').attr("style", "display: none");
//                     $(`.${$selected}`).attr("style", "display: block");
//                 }
//             });
//             //$(`option[value=${$selected}]`).fadeIn();
//         // }else{
//         //     $('div').removeClass('filtered').fadeIn();
//         //     $(`option[value=${$selected}]`).fadeIn();
//         }
//     })
// }

// $(() => Gallery.readJson());

// // // Configure an object to hold all of our functions for dynamic updates & event handlers 
// // let gallareyView = {};

// // galleryView.populateFilters = function() {
// //     $('gallery').each(function() {
// // let title, description, keyword, optionTag;

// // if (!$(this).hasClass('photo-template')) {

// //     title = $(this).attr('data-gallery');

//    // DONE: Refactor this concatenation using a template literal.

//    optionTag = `<option value= "${keyword}"> ${keyword} </option>`;
//    if ($('#filter-key option[value="' + filter-key + '"]').length === 0) {
       
//     $('#filter-key').append(optionTag);

//    }