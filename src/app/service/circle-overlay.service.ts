// 继承API的BMap.Overlay
declare let BMap;
// export class CircleOverlarService {
//     center: any;
//     length: any;
//     color: any;
//     constructor(center, length, color) {
//         this.center = center;
//         this.length = length;
//         this.color = color;
//     }
// }


export function CircleOverlarService(center, name, count, length, color, mouseoverColor) {
    // console.log(this);
    this._center = center;
    this._length = length;
    this._color = color;
    this._mouseoverColor = mouseoverColor;
    this._name = name;
    this._count = count;
}

CircleOverlarService.prototype = new BMap.Overlay();

// 实现初始化方法
CircleOverlarService.prototype.initialize = function (map) {
    const that = this;
    // 保存map对象实例
    this._map = map;
    // console.log(this._point);
    // console.log(this);
    // 创建div元素，作为自定义覆盖物的容器
    const div = document.createElement('div');

    // div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    // div.style.zIndex = BMap.Overlay.getZIndex(this._center.lat);
    div.style.zIndex = '999';
    div.style.position = 'absolute';
    // 可以根据参数设置元素外观
    div.style.width = this._length + 'px';
    div.style.height = this._length + 'px';
    // div.style.lineHeight = this._length + 'px';
    div.style.background = this._color;

    div.className = 'i-circle';
    // 将div添加到覆盖物容器中
    map.getPanes().markerPane.appendChild(div);
    // 保存div实例
    this._div = div;
    // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
    // hide方法，或者对覆盖物进行移除时，API都将操作此元素。

    const span = this._span = document.createElement('span');
    const span2 = this._span2 = document.createElement('span');
    const br = document.createElement('br');
    div.appendChild(span);
    div.appendChild(br);
    div.appendChild(span2);
    span.appendChild(document.createTextNode(this._name));
    span2.appendChild(document.createTextNode(this._count));



    const arrow = this._arrow = document.createElement('div');

    div.onmouseover = function () {
        this.style.backgroundColor = that._mouseoverColor;
        this.style.zIndex = '1000';
        // this.style.borderColor = '#0000ff';
        // this.getElementsByTagName('span')[0].innerHTML = that._overText;
        // arrow.style.backgroundPosition = '0px -20px';
    };

    div.onmouseout = function () {
        this.style.backgroundColor = that._color;
        this.style.zIndex = '999';
        // this.style.borderColor = "#BC3B3A";
        // this.getElementsByTagName("span")[0].innerHTML = that._text;
        // arrow.style.backgroundPosition = "0px 0px";
    };

    return div;
};

// 实现绘制方法
CircleOverlarService.prototype.draw = function () {
    // 根据地理坐标转换为像素坐标，并设置给容器
    const position = this._map.pointToOverlayPixel(this._center);
    this._div.style.left = position.x - this._length / 2 + 'px';
    this._div.style.top = position.y - this._length / 2 + 'px';
};

// 实现显示方法
CircleOverlarService.prototype.show = function () {
    if (this._div) {
        this._div.style.display = '';
    }
};
// 实现隐藏方法
CircleOverlarService.prototype.hide = function () {
    if (this._div) {
        this._div.style.display = 'none';
    }
};
// 添加自定义方法
CircleOverlarService.prototype.toggle = function () {
    if (this._div) {
        if (this._div.style.display === '') {
            this.hide();
        } else {
            this.show();
        }
    }
};
