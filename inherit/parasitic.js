/**
 * 寄生式继承的思路与(寄生)构造函数和工厂模式类似, 
 * 即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,
 * 最后再像真的是它做了所有工作一样返回对象. 如下.
 * @param {*} original 
 */
function createAnother(original){
	var clone = object(original);//通过调用object函数创建一个新对象
	clone.sayHi = function(){//以某种方式来增强这个对象
		alert("hi");
	};
	return clone;//返回这个对象
}


/**
 * 其背后的基本思路是: 不必为了指定子类型的原型而调用超类型的构造函数
 * @param {*} subClass 
 * @param {*} superClass 
 */
function extend(subClass,superClass){
	var prototype = object(superClass.prototype);//创建对象
	prototype.constructor = subClass;//增强对象
  subClass.prototype = prototype;//指定对象
  //subClass.prototype.constructor = subClass
}