
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

// baidu map
declare let BMap;
declare let BMapLib;
declare let BMAPLIB_TAB_SEARCH;
declare let BMAPLIB_TAB_TO_HERE;
declare let BMAPLIB_TAB_FROM_HERE;
declare let BMAP_STATUS_SUCCESS;

@Injectable()
export class BeiduMAPService {

    // private headers: any;
    constructor(private http: Http) {
        // this.headers = new Headers();

        // this.headers.append("Access-Control-Allow-Origin", "http://172.18.1.133:10001");

    }

    // 'http://api.map.baidu.com/location/ip?ip=&ak=MMOuEtslFs2yppwcggMudtBUtk8CbqnA&coor=bd09ll'
    getURL(url: string): Observable<any[]> {

        return this.http.get(url)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();

                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }

    postURL(url: string, body: any): Observable<any[]> {

        return this.http.post(url, body)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();

                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }

    // 随机向地图添加25个标注
    addPoint(baidumap: any, fun: any) {

        const bounds = baidumap.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const lngSpan = Math.abs(sw.lng - ne.lng);
        const latSpan = Math.abs(ne.lat - sw.lat);
        for (let i = 0; i < 25; i++) {
            const point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
            // this.addMarker(point);
            fun(point);
        }
    }

    // 浏览器定位
    addGeolocation(baidumap: any) {

        const geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {

            if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                // fun(r);
                const mk = new BMap.Marker(r.point);
                baidumap.addOverlay(mk);
                // baidumap.panTo(r.point);
                // console.log('你的位置');
                // console.log(r.point);
                // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                // that.addInfoWindow(mk);
                return r.point;
            } else {
                alert('failed' + this.getStatus());
            }
        }, { enableHighAccuracy: true });

        // 关于状态码
        // BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
        // BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
        // BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
        // BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
        // BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
        // BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
        // BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
        // BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
        // BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)



    }


    // 编写自定义函数,创建标注
    addMarker(baidumap, point) {
        console.log(baidumap);
        const marker = new BMap.Marker(point);
        baidumap.addOverlay(marker);
        // map.panTo(point);
        // this.addInfoWindow(marker);
    }

    // 获取marker的位置
    getAttr(marker) {
        const p = marker.getPosition();       // 获取marker的位置
        alert('marker的位置是' + p.lng + ',' + p.lat);
    }

    // 提供的信息窗口
    addInfoWindow(baidumap, marker) {

        const content = '<div style="margin:0;line-height:20px;padding:2px;">' +
            '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
            '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
            '</div>';

        const infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
        marker.addEventListener('click', function () {
            baidumap.openInfoWindow(infoWindow); // 开启信息窗口
        });
    }

    // 创建检索信息窗口对象
    addSearchInfoWindow(baidumap, marker) {
        // 提供的信息窗口

        const content = '<div style="margin:0;line-height:20px;padding:2px;">' +
            '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
            '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
            '</div>';

        // //创建检索信息窗口对象
        let searchInfoWindow = null;
        searchInfoWindow = new BMapLib.SearchInfoWindow(baidumap);
        searchInfoWindow = new BMapLib.SearchInfoWindow(baidumap, content, {
            title: '百度大厦',      // 标题
            width: 290,             // 宽度
            height: 105,              // 高度
            panel: 'panel',         // 检索结果面板
            enableAutoPan: true,     // 自动平移
            searchTypes: [
                BMAPLIB_TAB_SEARCH,   // 周边检索
                BMAPLIB_TAB_TO_HERE,  // 到这里去
                BMAPLIB_TAB_FROM_HERE // 从这里出发
            ]
        });

        marker.addEventListener('click', function () {
            searchInfoWindow.open(marker);
        });
    }

    // 根据关键字本地搜索
    addLocalSearch(baidumap) {
        const local = new BMap.LocalSearch(baidumap, {
            renderOptions: { map: baidumap }
        });
        local.search('景点');
    }

    // 根据多关键字本地搜索
    addSearchInBounds(baidumap) {
        const myKeys = ['酒店', '加油站'];
        const local = new BMap.LocalSearch(baidumap, {
            renderOptions: { map: baidumap, panel: 'r-result' },
            pageCapacity: 5
        });
        local.searchInBounds(myKeys, baidumap.getBounds());
    }


}
