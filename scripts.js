// UX script
$(document).ready(function(){
	$('.clear').click(function(){
		$('input[type=text]').val('');//set empty
	});
	$('.newtaskbook').click(function(){
		$('.items').empty();
		$('.items').removeAttr('id');
		$('#listBox').removeClass('hidden');
		$('.taskBox').addClass('hidden');
		entries = 0; total = 0;
		$('.entries').empty().append(entries +' of ' + total + ' remaining ');
		$('.save').addClass('disabled');
		$('#check').attr('onclick', 'enter()');
		$('#boxer').attr('onkeypress', 'return enter(event)');
		setTimeout(function(){
			$('.buttons').css({
				'position': 'relative',
				'margin-top': '80px',
				'transition': 'all 280ms ease-in',
				'z-index': '1',
				'opacity': '1'
			});
		}, 500);
	});
});
$(document).ready(function(){
	$('.newtaskbook').hover(function(){
		$('.newtaskbook').css('background-color', 'rgba(255,255,255,0.2)');
		$('.newtaskbook').css('box-shadow', '0px 0px 34px 0px rgba(0, 0, 0, 0.7)');
		$('.newtaskbook').css('border', 'none');
		$('.newtaskbook').css('cursor', 'pointer');
		$('.newtaskbook').css('height', '165px');
		$('.newtaskbook').css('width', '110px');
		$('.createbtn').css('background-color', '#3C3741');
		$('.createbtn i').css('color', '#fff');
	},function(){
		$('.darkOne').addClass('displayZero');
		$('.whiteOne').removeClass('displayZero');
		$('.newtaskbook').css('background-color', 'transparent');
		$('.newtaskbook').css('box-shadow', '0px 0px 11px 0px rgba(0,0,0,0.5)');
		$('.newtaskbook').css('height', '150px');
		$('.newtaskbook').css('width', '100px');
		$('.createbtn').css('background-color', '#fff');
		$('.createbtn').css('position', 'relative');
		$('.createbtn').css('top', '50px');
		$('.createbtn').css('left', '21px');
		$('.createbtn i').css('color', 'black');
		$('.newtaskbook').css('border', '5px dashed #FFFFF7');
	});
	$('.newtaskbook').on('mousemove', function(e){
		$('.darkOne').removeClass('displayZero');
		$('.whiteOne').addClass('displayZero');
		$('.darkOne').css('position', 'absolute');
		$('.darkOne').css('top', e.pageY-20);
		$('.darkOne').css('left', e.pageX-20);
	});
});

$(document).ready(function(){
	$('.save').click(function(){
	$('#check').attr('onclick', 'enter()');
	$('#boxer').attr('onkeypress', 'return enter(event)');
		$('.buttons').css({
			'position': 'relative',
			'margin-top': '0',
			'transition': 'all 280ms ease-in',
			'z-index': '-1',
			'opacity': '0'
		});
		setTimeout(function(){
			$('#listBox').addClass('hidden');
			$('.taskBox').removeClass('hidden');
		}, 500);
		collectorF();
		var pid = $('.items').attr('id');
		if(isNaN(pid)){
			refresh();
			refresh();
			refresh();
			collectorP();
		}else if(!isNaN(parseInt(pid))){
			refreshOld(pid);
			refreshOld(pid);	
			refreshOld(pid);
			collectorP();				
		}
		//should also run a function
	});
});
$(document).ready(function(){
	$('.closeBTN').click(function(){
	$('#check').attr('onclick', 'enter()');
	$('#boxer').attr('onkeypress', 'return enter(event)');
		$('.buttons').css({
			'position': 'relative',
			'margin-top': '0',
			'transition': 'all 280ms ease-in',
			'z-index': '-1',
			'opacity': '0'
		});
		setTimeout(function(){
			$('#listBox').addClass('hidden');
			$('.taskBox').removeClass('hidden');
		}, 500);
		//should not run a function
	});
});

// fancy script
function collectorP(){
	$('#Li').empty();
	var collection = parseInt(collector.length);
	if(parseInt(collector.length) > 0){
		for(var i = 0; i < collection; i++){
			if(collector[i].length > 0){
				$('#Li').append('<div class="oldtaskbook"><i onclick="deleteOld('+i+')" class="fa fa-times-circle pull-right"></i><i id='+i+' class="pull-left writing text-center">'+collector[i].length+' tasks remaining</i></div>');
			}
		}
	}
}
function collectorF(){
	$('.items').empty();for(i = 0; i < taskList.length; i++){
		if(taskList[i].status === 'checked'){
			taskList.splice(i, 1);
		}
	}
	collector.push(taskList);
	taskList = [];
	entries = 0; total = 0;
}

$(document).on('click', '.writing', function(){
	$('.items').empty();
	var id = $(this).attr('id');
	$('.items').attr('id', id);
	$('#check').removeClass('check');
	$('#boxer').attr('onkeypress', 'enterOld('+id+', event)');
	$('#check').attr('onclick','enterOld('+id+')');
	$('#listBox').removeClass('hidden');
	$('.taskBox').addClass('hidden');
	setTimeout(function(){
			$('.buttons').css({
				'position': 'relative',
				'margin-top': '80px',
				'transition': 'all 280ms ease-in',
				'z-index': '1',
				'opacity': '1'
			});
	}, 500);
	printOld(id);
});

function deleteOld(id){
	collector.splice(id, 1);
	$('#Li').empty();
	collectorP();
}

function printOld(id){
	entries = collector[id].length;
	total = entries;
	if(parseInt(entries) > 0){
		$('.save').removeClass('disabled');
	}else{
		$('.save').addClass('disabled');
	}
	for(i = 0; i < collector[id].length; i++){
		if(collector[id][i].status === 'checked'){
			if(entries !== 0){
				entries--;
			}
		}
	}	
	$('.entries').empty().append(entries +' of ' + total + ' remaining ');
	$('.entries').append('[<a href="javascript:void(0)" onclick="refreshOld('+id+')">Refresh</a>]');
	for (var i=0; i < collector[id].length; i++){
		$('.items').append('<p id='+id+' class="task'+i+' process"><input class="checkboxOld" id='+i+' type="checkbox"'+collector[id][i].status+'> ');
			if(collector[id][i].status === 'checked'){
				$('.task'+i).append('<s>'+collector[id][i].taskname+' <small>'+collector[id][i].date()+'</small></s> ');
			}else{
				$('.task'+i).append(collector[id][i].taskname+' <small>'+collector[id][i].date()+'</small>');
			}
		$('.task'+i).append('<i onclick="removeOld('+id+')" class="fa fa-times btn btn-danger pull-right"></i></p>');
	}
}

function refreshOld(id){
	total = entries;
	$('.items').empty();
	for(i = 0; i < collector[id].length; i++){
		if(collector[id][i].status === 'checked'){
			collector[id].splice(i, 1);
			refreshOld(id);
		}
	}
	$('.items').empty();
	$('.items').empty();
	$('.items').empty();
	printOld(id);
}

$(document).on('change', '.checkboxOld', function() {
    if(this.checked) {
		var cid = $(this).parent().attr('id');
    	var id = $(this).attr('id');
    	collector[cid][id].status = 'checked';
    	$('.items').empty();
    	printOld(cid);
    }else{
    	var id = $(this).attr('id');
    	collector[cid][id].status = 'unchecked';
    	$('.items').empty();
    	printOld(cid);
    }
});

function removeOld(id){
	var cid = id;
    var id = parseInt($(this).siblings('input').attr('id'));
	collector[cid].splice(id, 1);
    $('.items').empty();
    print();
}

function enterOld(id){
	//printOld(id);//just a function to print everything 
	var task = $('input[type=text]').val();//get value
	if(parseInt(task.length) > 0){
		$('.items').empty();
		$('input[type=text]').val('');
		taskCreatorOld(id,task);
		printOld(id);
	}else{
		alert('Task entry box empty');
	}
}

function enterOld(id, event){
	if(event.keyCode == 13){
		//printOld(id);//just a function to print everything 
		var task = $('input[type=text]').val();//get value
		if(parseInt(task.length) > 0){
			$('.items').empty();
			$('input[type=text]').val('');
			taskCreatorOld(id,task);
			printOld(id);
		}else{
			alert('Task entry box empty');
		}
	}
}

function taskCreatorOld(id,name){
	var name = new task(name);
	collector[id].push(name);
}

// list script 
var collector = [];
var taskList = []; 
var entries = 0; 
var total = 0;

function enter(){
	var task = $('input[type=text]').val();//get value
	if(parseInt(task.length) > 0){
		$('.items').empty();
		$('input[type=text]').val('');
		taskCreator(task);
		print();
	}else{
		alert('Task entry box empty');
	}
}

function enter(event){
	if(event.keyCode == 13){
		var task = $('input[type=text]').val();//get value
		if(parseInt(task.length) > 0){
			$('.items').empty();
			$('input[type=text]').val('');
			taskCreator(task);
			print();
		}else{
			alert('Task entry box empty');
		}
	}
}


$(document).on('change', '.checkbox', function() {
    if(this.checked) {
    	var id = $(this).attr('id');
    	taskList[id].status = 'checked';
    	$('.items').empty();
    	print();
    }else{
    	var id = $(this).attr('id');
    	taskList[id].status = 'unchecked';
    	$('.items').empty();
    	print();
    }
});

$(document).on('click', '#remove', function(){
    var id = parseInt($(this).siblings('input').attr('id'));
    taskList.splice(id, 1);
    $('.items').empty();
    print();
});

function task(taskname){//Constructor Function
	this.taskname = taskname;
	this.date = function(){
		var date = new Date().toString();
		return date.substr(0,15);
	};
	this.status = 'unchecked';
}

function taskCreator(name){
	var name = new task(name);
	taskList.push(name);
}

function print(){
	entries = taskList.length;
	total = entries;
	if(parseInt(entries) > 0){
		$('.save').removeClass('disabled');
	}else{
		$('.save').addClass('disabled');
	}
	for(i = 0; i < taskList.length; i++){
		if(taskList[i].status === 'checked'){
			if(entries !== 0){
				entries--;
			}
		}
	}	
	$('.entries').empty().append(entries +' of ' + total + ' remaining ');
	$('.entries').append('[<a href="javascript:void(0)" onclick="refresh()">Refresh</a>]');
	for (var i=0; i < taskList.length; i++){
		$('.items').append('<p class="task'+i+'"><input class="checkbox" id='+i+' type="checkbox"'+taskList[i].status+'> ');
			if(taskList[i].status === 'checked'){
				$('.task'+i).append('<s>'+taskList[i].taskname+' <small>'+taskList[i].date()+'</small></s> ');
			}else{
				$('.task'+i).append(taskList[i].taskname+' <small>'+taskList[i].date()+'</small>');
			}
		$('.task'+i).append('<i id="remove" class="fa fa-times btn btn-danger pull-right"></i></p>');
	}
}

function refresh(){
	total = entries;
	$('.items').empty();
	for(i = 0; i < taskList.length; i++){
		if(taskList[i].status === 'checked'){
			taskList.splice(i, 1);
			refresh();
		}
	}
	$('.items').empty();
	$('.items').empty();
	$('.items').empty();
	print();
}