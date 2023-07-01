
// function extend(Child,Parent) {
//     var con = function () {
//
//     };
//     con.prototype = Parent.prototype;
//     Child.prototype = new con()
//
//     Child.prototype.constructor = Child;
//     Child.uber = Parent.prototype//为子对象设uber属性，直接指向夫对象的Prototype，为了实现继承的完备性
// }

window.onload = function () {
    //配置画布，绘画工具
    var VSHADER_SOURUE =
        "void main(){"+
        "gl_Position = vec4(0.0,0.0,0.0,0.1);"+
        "gl_PoinSize = 10.0;"+
        "}";

    var FSHADER_SOURUE =
        "void main(){"+
        "gl_FragColor = vec4(1.0,0.0,0.0,1.0);"+

        "}";
    var canvas = document.getElementById("top");
    var gl = canvas.getContext('webgl');
    if(!gl){
        console.log("lost")
        return;

    }
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader,VSHADER_SOURUE);
    gl.compileShader(vertShader);
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader,FSHADER_SOURUE);
    gl.compileShader(fragShader);

    var shaderProgram  = gl.createProgram();
    gl.attachShader(shaderProgram,vertShader);
    gl.attachShader(shaderProgram,fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //使用以上工具正式绘画
    gl.drawArrays(gl.POINTS,0,1);
}