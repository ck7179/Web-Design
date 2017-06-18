/*=====social_link_bg_change=====*/
function socail_g_over(){document.getElementById('socail_g').src ="images/social_google.png"}
function socail_g_out(){document.getElementById('socail_g').src ="images/social_google2.png"}
function socail_t_over(){document.getElementById('socail_t').src ="images/social_twitter.png"}
function socail_t_out(){document.getElementById('socail_t').src ="images/social_twitter2.png"}
function socail_f_over(){document.getElementById('socail_f').src ="images/social_facebook.png"}
function socail_f_out(){document.getElementById('socail_f').src ="images/social_facebook2.png"}

/*=====wrapper_js=====*/
$(document).ready(function(){
	var box = document.getElementById('box');
	var sidebar_ctrl = document.getElementById('sidebar_ctrl');
	var t_1 = document.getElementById('t_1');
	var t_2 = document.getElementById('t_2');
	var tab_card_button_c_1 = document.getElementById('tab_card_button_c_1');
	var tab_card_button_c_2 = document.getElementById('tab_card_button_c_2');

	//box click event handle
	box.style.cursor = 'pointer';
	box.addEventListener('click', function() {
		$(box).addClass("animated zoomIn");   
		$(main).addClass("show");
		$(main).addClass("animated zoomIn ");
		if(writeGoogleMapsScript()){
			
		}	
	},false);

	//sidebar_ctrl click event handle
	sidebar_ctrl.style.cursor = 'pointer';
	sidebar_ctrl.addEventListener('click', function() {		
		if($('#sidebar').hasClass("slide_left")){
			$('#sidebar_wrapper').width(320);
			$('#sidebar').removeClass("slide_left");
			document.getElementById('sidebar_ctrl_img').src="images/left_arrow.png";
		}else{
			$('#sidebar_wrapper').width(30);
			$('#sidebar').addClass("slide_left");
			document.getElementById('sidebar_ctrl_img').src="images/right_arrow.png";
		}	
	},false);

	//tab click event handle
	t_1.addEventListener('click', function(){
		if(!$(t_1).hasClass("t_select")){
			$(t_2).removeClass("t_select");
			$(t_1).addClass("t_select");
			$(c_2).removeClass("display_show");
			$(c_2).addClass("display_hide");
			$(c_1).removeClass("display_hide");
			$(c_1).addClass("display_show");
			settingMap(16,200,'c_1');
		}
	},false);
	t_2.addEventListener('click', function(){
		if(!$(t_2).hasClass("t_select")){
			$(t_1).removeClass("t_select");
			$(t_2).addClass("t_select");
			$(c_1).removeClass("display_show");
			$(c_1).addClass("display_hide");
			$(c_2).removeClass("display_hide");
			$(c_2).addClass("display_show");
			if($('.monitor_i').attr('src') == ''){
				settingMap(16,200,'c_2');
				$('#c_2_form').val("200");
			}else{
				form_select($('#c_2_form').val(),'c_2');
			}	
		}
	},false);
	
	//tab_card_button click event handle
	tab_card_button_c_1.addEventListener('click',function(){
		onTabCardButtonClick(tab_card_button_c_1);
	},false);
	/*tab_card_button_c_2.addEventListener('click',function(){
		onTabCardButtonClick(tab_card_button_c_2);
	},false);*/

	//tab_card_button function
	function onTabCardButtonClick(button){
		if($(button).attr("src") == "images/button_left.png"){
			$(button).attr("src","images/button_right.png");
			if($(button).parent().parent().attr('id')=="c_1"){
				$(c_1_1).removeClass("display_show");
				$(c_1_1).addClass("display_hide");
				$(c_1_2).removeClass("display_hide");
				$(c_1_2).addClass("display_show");
				settingMap(15,"高雄全區",'c_1');
			}else{
				$(c_2_1).removeClass("display_show");
				$(c_2_1).addClass("display_hide");
				$(c_2_2).removeClass("display_hide");
				$(c_2_2).addClass("display_show");
			}
		}else{
			$(button).attr("src","images/button_left.png");
			if($(button).parent().parent().attr('id')=="c_1"){
				$(c_1_1).removeClass("display_hide");
				$(c_1_1).addClass("display_show");
				$(c_1_2).removeClass("display_show");
				$(c_1_2).addClass("display_hide");
				settingMap(16,200,'c_1');
			}else{
				$(c_2_1).removeClass("display_hide");
				$(c_2_1).addClass("display_show");
				$(c_2_2).removeClass("display_show");
				$(c_2_2).addClass("display_hide");
			}
		}
	}	
});	

/*=====call map reload event*/



//動態 load google maps api
	function writeGoogleMapsScript(){
		document.oldWrite = document.write;
		document.write = function (text){
			var parser = new DOMParser();
			var element = parser.parseFromString(text, "text/xml");
			var child = element.firstChild;
			var element = document.createElement("script");
			element.src = child.getAttribute('src');
			element.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(element);
			document.write = document.oldWrite;
		};
		var element = document.createElement("script");
		element.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDTc9Wqj4Bi5DVvh2ngGiinVcsVUagG9fY&libraries=visualization&callback=initMap";
		element.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(element);
	}

var userLocation;

//initial map setting
function initMap(){
	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 16,
	});
	getUserLocation(map,'true',200);
}

//form select click event handle
function form_select(v,card){
	if(parseInt(v)<=700){
		settingMap(16,parseInt(v),card);
	}else if(parseInt(v)>700 && parseInt(v)<=2500){
		settingMap(14,parseInt(v),card);
	}else if(parseInt(v)>2500 && parseInt(v)<=12000){
		settingMap(13,parseInt(v),card);
	}else{
		settingMap(14,v,card);
	}	
}

//google maps setting function
function settingMap(z,v,card){
	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: z,
	});
	if(typeof(v)=='number'){
		getUserLocation(map,'false',200);
		if(card=="c_1"){

			getData_1(map,v);
		}else{
			getData_2(map,v);
		}	
	}	
	if(typeof(v)=='string'){
		if(card=="c_1"){
			getData_1(map,v);
		}else{
			getData_2(map,v);
		}
	}	
}

//向瀏覽器取得位置 function
function getUserLocation(map,init,v){
	if(navigator.geolocation) {
    	browserSupportFlag = true;
    	navigator.geolocation.getCurrentPosition(function(position) {
      		initialLocation = {lat: position.coords.latitude, lng: position.coords.longitude};    		   		
    		setUserLocCenter(map,initialLocation);
    		if(init=="true"){
    			getData_1(map,v);
    		}
    	}, function() {
      		handleNoGeolocation(browserSupportFlag);
    	});
  	}
  	else {
    	browserSupportFlag = false;
    	handleNoGeolocation(browserSupportFlag);
  	}
  	function handleNoGeolocation(errorFlag) {
    	if (errorFlag == true) {
      		alert("地圖定位失敗，您需要允許定位的授權才能使用");
    	}else{
      		alert("您的瀏覽器不支援定位服務");
    	}
		initialLocation = {lat: 22.632266, lng: 120.305715};
		map.setCenter(initialLocation);
  	}		
}

//設定使用者位置marker及地圖中心
function setUserLocCenter(map,initialLocation){
	map.setCenter(initialLocation);
	userLocation = initialLocation;
	var centerMarker = new google.maps.Marker({
		position: initialLocation,
		map: map,
		optimized: false,
		title:'當前位置',
		icon: {
			url: 'images/dot.png',
			size: new google.maps.Size(34, 34),
			scaledSize: new google.maps.Size(17, 17),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(8, 8)
		},			
		zIndex:99999999
	});	
}

//擷取od資料 function
function getData_1(map,v){
	var xhr = new XMLHttpRequest();
	xhr.open('get','https://raw.githubusercontent.com/ck7179/Web-Design/master/final/resource/od.txt');
	xhr.send(null);
	xhr.onload = function(){
		var data = JSON.parse(xhr.responseText);
		data = data.result.records;
		var heat_locs = [];
		var marker_locs = [];
		var markers = [];
		var infoWindows = [];
		if(typeof(v)=='string'){ //行政區範圍
			if(v=="高雄全區"){
				for(var i=1;data.length>i;i++){	
					if(data[i].CityName=="高雄市"){
						var marker_loc =  new google.maps.LatLng(parseFloat(data[i].Latitude),parseFloat(data[i].Longitude));
						marker_locs.push(marker_loc);
						heat_locs.push({location:marker_loc,weight:1});
					}	
				}
				addHeatMap(heat_locs,map);
				map.setZoom(12);
			}else{		
				for(var i=1;data.length>i;i++){				
					if(data[i].CityName=="高雄市" && data[i].RegionName==v){
						marker_loc = {lat: parseFloat(data[i].Latitude), lng: parseFloat(data[i].Longitude)};
			   			var marker = new google.maps.Marker({
							position: marker_loc,
							map: map,
							zIndex:1,
							label: data[i].limit
						});
						markers.push(marker);
						marker_locs.push(marker_loc);
						var message = '<span class="marker_title">測速照相機</span><p class="marker_p">位置:'+data[i].Address+'</p><p class="marker_p">方向:'+data[i].direct+'</p>';
						addInfoWindow(marker,message);
					}		
				}			
			}
			if(marker_locs[0]){
				map.setCenter(marker_locs[0]);
			}else{
				alert("此區尚無資料!");
				map.setCenter(userLocation);
				map.setZoom(17);
			}
			$('.highlight')	.text(marker_locs.length);
		}else if(typeof(v)=='number'){ //方圓範圍
			var rangeCircle = new google.maps.Circle({
				strokeColor: '#0066FF',
				strokeOpacity: 0.2,
				strokeWeight: 2,
				fillColor: '#0066FF',
				fillOpacity: 0.1,
				map: map,
				center: userLocation,
				radius: v
			});
			for(var i=1;data.length>i;i++){	
				if(data[i].CityName=="高雄市"){
					if(distance(userLocation.lat,userLocation.lng,parseFloat(data[i].Latitude),parseFloat(data[i].Longitude))<=v){
						marker_loc = {lat: parseFloat(data[i].Latitude), lng: parseFloat(data[i].Longitude)};
			   			var marker = new google.maps.Marker({
							position: marker_loc,
							map: map,
							zIndex:1,
							label: data[i].limit
						});
						markers.push(marker);
						marker_locs.push(marker_loc);
						var message = '<span class="marker_title">測速照相機</span><p class="marker_p">位置:'+data[i].Address+'</p><p class="marker_p">方向:'+data[i].direct+'</p>';
						addInfoWindow(marker,message);
					}		
				}			
			}
			$('.highlight')	.text(marker_locs.length);
		}
		function addInfoWindow(marker, message) {
            var infoWindow = new google.maps.InfoWindow({
                content: message
            });
            infoWindows.push(infoWindow);
            google.maps.event.addListener(marker, 'click', function () {
            	hideAllInfoWindows(map);
            	infoWindow.open(map, marker);
            });
        }
        function hideAllInfoWindows(map) {
   			infoWindows.forEach(function(infoWindow) {
     		infoWindow.close();
  			});
  		} 
	}
}

function getData_2(map,v){
	var xhr = new XMLHttpRequest();
	xhr.open('get','https://raw.githubusercontent.com/ck7179/Web-Design/master/final/resource/od2.txt');
	xhr.send(null);
	xhr.onload = function(){
		var data = JSON.parse(xhr.responseText);
		data = data.XML_Head.Infos.Info;
		var heat_locs = [];
		var marker_locs = [];
		var markers = [];
		var infoWindows = [];
		if(typeof(v)=='string'){ //行政區範圍
			if(v=="高雄全區"){
				for(var i=0;data.length>i;i++){	
					var marker_loc =  new google.maps.LatLng(parseFloat(data[i].py),parseFloat(data[i].px));
					marker_locs.push(marker_loc);
					heat_locs.push({location:marker_loc,weight:1});	
				}
				addHeatMap(heat_locs,map);
				map.setZoom(12);
			}else{		
				for(var i=1;data.length>i;i++){				
					if(data[i].CityName=="高雄市" && data[i].RegionName==v){
						marker_loc = {lat: parseFloat(data[i].Latitude), lng: parseFloat(data[i].Longitude)};
			   			var marker = new google.maps.Marker({
							position: marker_loc,
							map: map,
							zIndex:1,
							label: data[i].limit
						});
						markers.push(marker);
						marker_locs.push(marker_loc);
						var message = '<span class="marker_title">測速照相機</span><p class="marker_p">位置:'+data[i].Address+'</p><p class="marker_p">方向:'+data[i].direct+'</p>';
						addInfoWindow(marker,message);
					}		
				}			
			}
			if(marker_locs[0]){
				map.setCenter(marker_locs[0]);
			}else{
				alert("此區尚無資料!");
				map.setCenter(userLocation);
				map.setZoom(17);
			}
			$('.highlight')	.text(marker_locs.length);
		}else if(typeof(v)=='number'){ //方圓範圍
			var rangeCircle = new google.maps.Circle({
				strokeColor: '#0066FF',
				strokeOpacity: 0.2,
				strokeWeight: 2,
				fillColor: '#0066FF',
				fillOpacity: 0.1,
				map: map,
				center: userLocation,
				radius: v
			});
			var trafficLayer = new google.maps.TrafficLayer();
        	trafficLayer.setMap(map);
			for(var i=0;data.length>i;i++){	
					if(distance(userLocation.lat,userLocation.lng,parseFloat(data[i].py),parseFloat(data[i].px))<=v){
						marker_loc = {lat: parseFloat(data[i].py), lng: parseFloat(data[i].px)};
			   			var marker=[];
			   			marker[i] = new google.maps.Marker({
							position: marker_loc,
							map: map,
							zIndex:1,
							id:data[i].cctvid,
							num:i
						});
						markers.push(marker);
						marker_locs.push(marker_loc);
						var message = '<span class="marker_title">動態即時影像</span><p class="marker_p">位置:'+data[i].roadsection+'</p><p class="marker_p">cctv編號:'+data[i].cctvid+'</p>';
						addInfoWindow(marker[i],message);
						console.log("i:"+i+"/mark:"+marker[i].id);
						marker[i].addListener('click',function(){
							console.log(this.id);
							load_imag(this.id);
							//load_imag(marker.id);
						});	
						function go(a){
							alert(a);
						}
					}
									
			}

			
		}
		function addInfoWindow(marker, message) {
            var infoWindow = new google.maps.InfoWindow({
                content: message
            });
            infoWindows.push(infoWindow);
            google.maps.event.addListener(marker, 'click', function () {
            	hideAllInfoWindows(map);
            	infoWindow.open(map, marker);
            });
        }
        function hideAllInfoWindows(map) {
   			infoWindows.forEach(function(infoWindow) {
     		infoWindow.close();
  			});
  		}

	}
}

function load_imag(i){
	/*console.log("load1",i);
	/*http://traffic.kctmc.nat.gov.tw/CCTV/cctv_view_atis.jsp?cctv_id="+i+"&w=270&h=220
	$('.monitor_i').empty();
	$('.monitor_i').attr('src',"http://traffic.kctmc.nat.gov.tw/CCTV/cctv_view_atis.jsp?cctv_id="+i+"&w=270&h=220")     
	.load(function(){ 
		console.log("11111");
	    
		$(this).width('300px');
        $(this).height('350px');
	    //$('.monitor').append( $(this) );
	});
	console.log("load2",i);*/
	$('#call').addClass("display_hide");
	$('#open').attr('href','http://traffic.kctmc.nat.gov.tw/CCTV/cctv_view_atis.jsp?cctv_id='+i+'&w=270&h=220').text("點擊查看即時影像");
	}		

//經緯度計算距離function
function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) * Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
 
	//console.log(Math.round(d*1000));
	return Math.round(d*1000);
}

//熱度圖函數
function addHeatMap(heatmapData,map){
	var heatmap = new google.maps.visualization.HeatmapLayer({
		data: heatmapData,
		/*dissipating:false,
		radius:0.005,
		maxIntensity:1.5*/
		dissipating:true,
		radius:25,
		maxIntensity:1.5							
	});
	heatmap.setMap(map);
} 



//車流量
