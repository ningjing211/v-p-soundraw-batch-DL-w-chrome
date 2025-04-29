$('[i18n-w]').each(function(){
  var m = $(this).attr('i18n-w');
  var t = chrome.i18n.getMessage(m);
  $(this).html(t);
})

function p2t(content){
  // Update Characters
  var str='';
  for(var i=0;i<content.length;i++){
    if(t2pChar().indexOf(content.charAt(i))!=-1) {
      str+=p2tChar().charAt(t2pChar().indexOf(content.charAt(i)));
    } else {
      str+=content.charAt(i);
    }
  }
  return str;
}
function t2p(content){
  // Update Characters
  var str='';
  for(var i=0;i<content.length;i++){
    if(p2tChar().indexOf(content.charAt(i))!=-1) {
      str+=t2pChar().charAt(p2tChar().indexOf(content.charAt(i)));
    } else {
      str+=content.charAt(i);
    }
  }
  return str;
}

var CACHE = 'cache';
function flushCache(data){
localStorage.setItem(CACHE, data);
}
// Get the content jQuery object
var target = $("#content");
// Auto Focus
target.focus();
if (localStorage.getItem(CACHE)) {
target.val(localStorage.getItem(CACHE));
};
// Save the cache in case a user accidently close the popup
target.on('keyup', function() {
flushCache(target.val());
});
// Convert Traditional Chinese -> Simplified Chinese
$("#t2p").click(function(){
	target.val(t2p(target.val()));
	flushCache(target.val());
  updateButtonStyle('#t2p');
});
// Convert Simplified Chinese -> Traditional Chinese
$("#p2t").click(function(){
	target.val(p2t(target.val()));
	flushCache(target.val());
  updateButtonStyle('#p2t');
});
// Clean the content
$("#clean").click(function(){
target.val('');
flushCache(target.val());
});

if (!window.location.href.includes('#fixed')) {
  $('#fixed_pop').show();
} else {
  $('body').css('height','auto');
  $('textarea').css('width','calc(100% - 12px)')
    .css('height','calc(100vh - 99px)');
}
$('#fixed_pop').click(function(){
  var pop_width = $(window).width();
  var pop_height = $(window).height() + 23;
  var left = (screen.width - pop_width) * .97;
  var top = 50;
  var windowName = 'popUpWindow' + Math.random();
  window.open(location.href + '#fixed',
    windowName,
    'scrollbars=no,resizable=no,titlebar=no,toolbar=no,'
    + 'menubar=no,location=no,directories=no,status=no,'
    + 'width=' 
    + pop_width + ',height=' + pop_height + ',top=' + top + ', left=' + left);
})
var copyText = chrome.i18n.getMessage('copy');
$('#copy').click(()=>{
    // Get the textarea element by its ID
    var content = document.getElementById("content");

    // Select the text inside the textarea
    content.select();
    content.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");
    updateButtonStyle("#copy");
})

function updateButtonStyle(btn_query){
  var $btn = $(btn_query);
  var originText = $btn.text();
  $btn.text('✓').addClass('copied');
  setTimeout(function(){
    $btn.text(originText).removeClass('copied');
  }, 399);
}