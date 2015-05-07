(function ($) {
  window.jcrop_api = null;

  window.init_papercrop = function() {
    $("div[id$=_cropbox]").each(function() {

      var attachment = $(this).attr("id").replace("_cropbox", "");

      var preview    = !!$("#" + attachment + "_crop_preview").length;
      var aspect     = $("input#" + attachment + "_aspect").val();
      var max_size     = $("input#" + attachment + "_max_size").val();
      var min_size     = $("input#" + attachment + "_min_size").val();
      var width      = $(this).width();

      update_crop = function(coords) {
        var preview_width, rx, ry;

        if (preview) {
          preview_width = $("#" + attachment + "_crop_preview_wrapper").width();

          rx = preview_width / coords.w;
          ry = preview_width / coords.h;

          $("img#" + attachment + "_crop_preview").css({
            width      : Math.round(rx * $("input[id$='_" + attachment + "_original_w']").val()) + "px",
            height     : Math.round((ry * $("input[id$='_" + attachment + "_original_h']").val()) / aspect) + "px",
            marginLeft : "-" + Math.round(rx * coords.x) + "px",
            marginTop  : "-" + Math.round((ry * coords.y) / aspect) + "px"
          });
        }

        $("#" + attachment + "_crop_x").val(Math.round(coords.x));
        $("#" + attachment + "_crop_y").val(Math.round(coords.y));
        $("#" + attachment + "_crop_w").val(Math.round(coords.w));
        $("#" + attachment + "_crop_h").val(Math.round(coords.h));
      };

			max_x = parseInt(max_size.split(" ")[0]);
			max_y =  parseInt(max_size.split(" ")[1]);		
			max_size_vec = [max_x, max_y];

			min_x = parseInt(min_size.split(" ")[0]);
			min_y =  parseInt(min_size.split(" ")[1]);		
			min_size_vec = [min_x, min_y];
      $(this).find("img").Jcrop({
        onChange    : update_crop,
        onSelect    : update_crop,
        setSelect   : [0, 0, 250, 250],
			  minSize     : min_size_vec,
			  maxSize     : max_size_vec,
        aspectRatio : aspect,
        boxWidth    : $("input[id$='_" + attachment + "_box_w']").val()
      }, function() {
        jcrop_api = this;
      });
    });
  };

  $(document).ready(function() {
    init_papercrop();
  });

}(jQuery));
