function initBody() {
  $('body').removeClass('no-js');
}

$(document).ready(function() {
  initBody();
  $('input').focus(function(){
    $(this).parents('.field').addClass('is-focused')
  });
  $('input').blur(function(){
    $(this).parents('.field').removeClass('is-focused')
  });

  // var tableOfContentsToggle =
  //   $('<a href="#" class="table-of-contents--toggle">Show table of contents</a>')
  //     .click(function(){
  //       $('body').toggleClass('show-table-of-contents');
  //       if ($('body').hasClass('show-table-of-contents')) {
  //         $('.table-of-contents--toggle').text('Hide table of contents');
  //       } else {
  //         $('.table-of-contents--toggle').text('Show table of contents');
  //       }
  //     });

  // $('nav.nav-main ol.breadcrumbs').before(tableOfContentsToggle);

  if ($('body').hasClass('layout-article')){
    numHeadings = $("main h2, main h3, main h4, main h5").length;
    if ( numHeadings > 2 ) {

      var inlineNavigation =
        "<nav role='navigation' class='inline-navigation'>" +
          "<h1>On this page:</h1>" +
          "<ul>";

      var inlineNavigationSelect = $('<select>');

      var newLine, el, title, link;

      $("main h2, main h3, main h4, main h5").each(function(index) {
        console.log(index);
        // $(this).waypoint({
        //   handler: function(direction){
        //     elementId = this.element.id;
        //     $("body.with-inline-navigation .inline-navigation li").removeClass('is-active');
        //     $("body.with-inline-navigation .inline-navigation li a[href=#" + elementId + "]").parent().addClass('is-active');
        //   }
        // });

        el = $(this);
        title = el.text();

        // If this heading has been assigned an ID
        if (el.attr("id") != undefined) {
          // Check to see if that ID conflicts with a manually assigned
          // anchor ID inside the heading. If it does, defer to the anchor.
          if (el.attr("id").slice(0, 4) == "a-id") {
            link = "#" + $(this).find('a').attr('id');
          // If not, use the heading's ID.
          } else {
          link = "#" + el.attr("id");
          }
        // If the heading has no ID, assign it one.
        } else {
          el.attr("id", "heading-" + index);
          link = "#" + el.attr("id");
        }

        var tocClass;
        if (el.is('h2')) { tocClass = "h2" };
        if (el.is('h3')) { tocClass = "h3" };
        if (el.is('h4')) { tocClass = "h4" };
        if (el.is('h5')) { tocClass = "h5" };

        newLine =
          "<li class='" + tocClass + "'>" +
            "<a href='" + link + "'>" +
              title +
            "</a>" +
          "</li>";

        inlineNavigation += newLine;
      });

      inlineNavigation +=
         "</ul>" +
        "</nav>";

      $('body').addClass('with-inline-navigation');
      if ($("main .wrapper h1.page-title+div.table-wrapper").length > 0){
        $("main .wrapper h1.page-title+div.table-wrapper").after(inlineNavigation);
      } else {
        $("main .wrapper h1.page-title+p").after(inlineNavigation);
      }

    }

  }

  //Add Image toggle handler for Travel guide
  $('img.travel-guide-hide').after($('<a />')
                            .addClass('travel-image-link')
                            .text('Show Me >')
                            .click(function(e){
                      e.preventDefault();
                      //console.log($(this));
                      $(this).prev('img.travel-guide-hide').toggle();

                      var text = $(this).text();
                      $(this).text(
                          text == "Show Me >" ? "Hide Image" : "Show Me >");
  }));
});