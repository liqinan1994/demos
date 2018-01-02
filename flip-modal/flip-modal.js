function $(element) {
	return document.querySelector(element);
};
function $$(element) {
	return document.querySelectorAll(element);
};

$("header .log-in").addEventListener('click',function(e){
	e.stopPropagation();
	$(".flip-modal").classList.add("show");
	if($(".flip-modal").classList.contains("register")){
		$(".flip-modal").classList.remove("register");
	    $(".flip-modal").classList.add("login");
	};
})

document.addEventListener('click',function(e){
	$(".flip-modal").classList.remove("show");
	$$(".modal .errormsg").forEach(function(e){
			e.innerText = "";
		})
	$$(".modal input[name=username],.modal input[name=password],.modal input[name=re-password]").forEach(function(e){
       e.value = "";
	})

})

//方法一： 遍历
// $$(".modal .close").forEach(function(e){
// 	e.onclick = function(){
// 		$(".flip-modal").classList.remove("show");
// 	}
// })

// $(".flip-modal").addEventListener('click',function(e){
// 	e.stopPropagation();
// })
// $$(".modal .login").forEach(function(e){
//     e.onclick = function(){
// 		$(".flip-modal").classList.remove("register");
// 		$(".flip-modal").classList.add("login");
//     }
// });
// $$(".modal .register").forEach(function(e){
// 	e.onclick = function(){
// 		$(".flip-modal").classList.remove("login")
// 		$(".flip-modal").classList.add("register")
// 	}	
// });

// 方法二： 事件代理
$(".flip-modal").addEventListener('click',function(e){
	e.stopPropagation();
	if(e.target.classList.contains("login")){
		this.classList.remove("register");
		this.classList.add("login");
	}
	if(e.target.classList.contains("register")){
		this.classList.add("register");
		this.classList.remove("login");
	}
	if(e.target.classList.contains("close")){
		$(".flip-modal").classList.remove("show");
		$$(".modal .errormsg").forEach(function(e){
			e.innerText = "";
		})
		$$(".modal input[name=username],.modal input[name=password],.modal input[name=re-password]").forEach(function(e){
           e.value = "";
		})
	}
})

$(".modal-login form").addEventListener("submit",function(e){
    e.preventDefault();
	if(!/^\w{3,8}$/.test($(".modal-login input[name=username]").value)){
         $(".modal-login .errormsg").innerText = "用户名需输入3~8个字符，包括字母、数字和下划线";
            return false;
	};
    if(!/^\w{6,10}$/.test($(".modal-login input[name=password]").value)){
         $(".modal-login .errormsg").innerText = "密码需输入6~10个字符，包括字母、数字和下划线";
         return false;
    };
    	this.submit();
})

$(".modal-register form").addEventListener("submit",function(e){
    e.preventDefault();
	if(!/^\w{3,8}$/.test($(".modal-register input[name=username]").value)){
         $(".modal-register .errormsg").innerText = "用户名需输入3~8个字符，包括字母、数字和下划线";
            return false;
	};
	if(/^hunger$|^KellanLi$/.test($(".modal-register input[name=username]").value)){
         $(".modal-register .errormsg").innerText = "用户名已存在";
            return false;
	};
    if(!/^\w{6,10}$/.test($(".modal-register input[name=password]").value)){
         $(".modal-register .errormsg").innerText = "密码需输入6~10个字符，包括字母、数字和下划线";
         return false;
    };
    if($(".modal-register input[name=re-password]").value !== $(".modal-register input[name=password]").value){
         $(".modal-register .errormsg").innerText = "两次输入的密码不一致";
         return false;
    }
    	this.submit();
})
