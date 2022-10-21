// tag追加処理の一般化(仮未完成)
function tagadds(prompts){
    tags = prompts.split(',');
    for (tag of tags) {
     pattern = /^[{\[\()]+/;
     splitword = tag.trim();
       if(splitword.match(pattern) == null){
         pr_word = splitword;
         jp_word = splitword;
         weighting = 0
       }else{
         len = splitword.match(pattern)[0].length;
         // console.log(len);
         // console.log(splitword.match(pattern)[0]);
         // console.log(splitword.slice(len,len*-1));
         // console.log(splitword.match(pattern)[0].charAt(0));
         pr_word = splitword.slice(len,len*-1);
         jp_word = splitword.slice(len,len*-1);
    
         if(splitword.match(pattern)[0].charAt(0)=='['){
           //弱化
           weighting = len*-1;
         }else{
           weighting = len
         }
       }
     //  pr_word = tag.trim();
     //  jp_word = tag.trim();
    
      //詳細情報として表示させるHTMLを変数に代入する
      content = '<tr><td><input type="text" value="'+pr_word+'" class="prompt_item"></td><td>'+pr_word+'</td><td><input type="number" value="'+weighting+'" class="counter1" data-max="500" data-min="0"></td><td><button class="btn .btn-info" id="x_button">x</button></td></tr>';
      $('#addtagbody').append(content);
      }
    
    jumontukuru()
}
// Sortableの実装>
$(function() {
    // リストを並べ替え可能に
    $('#addtagbody').sortable({
      // updateで並べ替えるたびに更新
      update: function(){
       jumontukuru()
      }
    });
    $('#addtagbody').draggable({
        // 追加先のリストid
        connectToSortable: '#addtagbody'
      });
  });
// Sortableの実装->ソート後に追加動作しないタイプ
$(function() {
    // リストを並べ替え可能に
    $('#sortable_table').sortable();
    $('#sortable_table').draggable({
        // 追加先のリストid
        connectToSortable: '#sortable_table'
      });
  });
function jumontukuru (){
    var itemIDs ='';
    // Novelai、SDWU記法の選択
    selboxValue = document.getElementById("selbox").value;
    if (selboxValue == "novelai") {
        prefix = '{'
        suffix = '}'
    }else{
        prefix = '('
        suffix = ')'
    }
    // console.log($('#addtagbody tr'))
    $('#addtagbody tr').map(function() {
        // console.log($(this))
        // ij = $(this).find('.counter1').val();

        // tag_text = $(this).children('.prompt_item').val()

        ij = $(this).find('input')[1].value;
        tag_text = $(this).find('input')[0].value;
        // console.log(tag_text)
        // console.log(ij)
        if(ij == 0){
            itemIDs += tag_text + ',';
        //   console.log(itemIDs)
        }else if(ij < 0){
            roop_count = Math.abs(ij);
            itemIDs += '['.repeat(roop_count) + tag_text + ']'.repeat(roop_count) + ',';
        //   console.log(itemIDs)
        }else{
            roop_count = Math.abs(ij);
            itemIDs += prefix.repeat(roop_count) + tag_text + suffix.repeat(roop_count) + ',';
        //   console.log(itemIDs)
        }
    });
    $("#log").val(itemIDs);

}
// Copyボタン制御
$('#copy').click(function() {
    navigator.clipboard.writeText(document.getElementById('log').value);//https以外で動作しない注意
    // console.log(document.getElementById('log').innerHTML)
    // $('#info').text('クリップボードにコピーしました')
    toastr["info"]("Promptsをクリップボードにコピーしました", "お知らせ");
    // console.log("コピー動作発火")
})
// tagリストからクリックで追加
$(document).on('click','a[name]',function () {
    $('#addtagbody').append(`    <tr><td><input type="text" value="`+$(this).attr('name')+`" class="prompt_item"></td></td>
      <td>`+$(this).text()+`</td>
      <td><input type="number" value="0" class="counter1" data-max="500" data-min="0"></td>
      <td><button class="btn .btn-info" id="x_button">x</button></td>
    </tr>`)
    jumontukuru();  
})

// 重みづけが変更されたときに呪文の再生成を行う
$(document).on('change','input[type="number"]', function () {
    // console.log('changed');  
    jumontukuru();          
});

// addtag_b
$('#addtag_b').click(function() {
    tagadds($('#addtag').val());
    jumontukuru()
    $('#addtag').val('');
})

// clear_b
$('#clear_b').click(function() {
    $('#addtag').val('');
})
// 動作確認済み tag削除
$(document).on('click','#x_button',function() {

    $(this).closest('tr').remove();
    jumontukuru();  
    // console.log(document.getElementById('log').innerHTML)
    // $('#info').text('クリップボードにコピーしました')
    // alert("remooove!");
})
//prompt全削除
$(document).on('click','#alldel',function() {

    // テーブル初期化
    document.querySelector('#addtagbody').innerHTML ="";
    jumontukuru()
  })
  

// トースター用設定
$(function() {

	//ドキュメントロード時に、toastr のオプションを設定する
	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": false,
	  "positionClass": "toast-top-center",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "1000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}


});

// csv to json
function csv2json(csvArray){
    let jsonArray = [];
// tab区切りで分割
    let RowArray = csvArray.split('\r\n');
    let items = RowArray[0].split('\t');
    for(let i = 1; i < RowArray.length; i++){
        let cellArray = RowArray[i].split('\t');
        let line = new Object();
        for(let j = 0; j < items.length; j++){
            line[items[j]] = cellArray[j];
        }
        jsonArray.push(line);
    }
    return jsonArray;
}
