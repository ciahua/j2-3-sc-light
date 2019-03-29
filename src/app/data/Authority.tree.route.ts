// 路由
export const AUTHORITYTREECOPYROUTE = [
    {
        id: 'HP-000', icon: 'fa fa-home nav-icon', routeLink: 'homepage', routeTitel: '首页', isCollapsed: false, hasRight: true
    },
    {
        id: 'SC-000', icon: 'fa fa-building nav-icon', routeLink: 'application', routeTitel: '智慧城市', isCollapsed: true, children: [
            { id: 'SC-001', icon: 'fa fa-bolt nav-icon-s', routeLink: 'application/calamity', routeTitel: '灾害报警' },
            { id: 'SC-002', icon: 'fa fa-tint nav-icon-s', routeLink: 'application/water',  routeTitel: '水质监测'},
            { id: 'SC-003', icon: 'fa fa-eye nav-icon-s', routeLink: 'application/electrical', routeTitel: '电气安全' },
            { id: 'SC-004', icon: 'fa fa-cloud nav-icon-s', routeLink: 'application/air/air-home', routeTitel: '空气质量', children: [
                {
                    id: 'SC-0041', routeLink: 'application/air/theairreport', name: '检测大数据', children: [
                        { id: 'SC-00411', routeLink: 'application/air/dashboard', name: '可视化报表'}
                        ]
                    }
                ]
            },
            {id: 'SC-005', icon: 'fa fa-lightbulb-o nav-icon-s', routeLink: 'application/light/light-home', routeTitel: '智慧照明', children: [
                    {  id: 'SC-0051', routeLink: 'application/light/thestrategy', routeTitel: '策略管理'
                    }
                ]
            },
            { id: 'SC-006', icon: 'fa fa-life-ring nav-icon-s', routeLink: 'application/cover', routeTitel: '窨井管理'},
            { id: 'SC-007', icon: 'fa fa-car nav-icon-s', routeLink: 'application/traffic', routeTitel: '智慧交通'},
            { id: 'SC-008', icon: 'fa fa-window-maximize nav-icon-s', routeLink: 'application/led', routeTitel: 'LED控制'}
        ]
    },
    { id: 'DA-000', icon: 'fa fa-desktop nav-icon', routeLink: 'monitor', routeTitel: '设备监控', isCollapsed: false, hasRight: true},

    { id: 'DM-000', icon: 'fa fa-map nav-icon', routeLink: 'device', routeTitel: '设备管理', isCollapsed: true, hasRight: false, children: [
            { id: 'DM-001', icon: 'fa fa-window-restore nav-icon-s', routeLink: 'device/devices/devices-home', routeTitel: '设备', children: [
                { id: 'DM-0010', name: '设备详情', routeLink: 'device/devices/devices-detail' },
                { id: 'DM-0011', routeLink: 'device/devices/install-log', name: '设备安装日志'},
                { id: 'DM-0012', routeLink: 'device/devices/line-log', name: '设备上下线日志' },
                // { id: 'DM-0013', routeLink: 'device/devices/history', name: '历史数据'}
                ]
            },

            { id: 'DM-002', icon: 'fa fa-product-hunt nav-icon-s', routeLink: 'device/product/product-home', routeTitel: '产品', children: [
                { id: 'DM-0021', name: '产品功能定义', routeLink: 'device/product/function-definition' },
            ]},
            { id: 'DM-003', icon: 'fa fa-map-marker nav-icon-s', routeLink: 'device/position', routeTitel: '位置'},
            { id: 'DM-005', icon: 'fa fa-road nav-icon-s',  routeLink: 'device/road', routeTitel: '道路'},
            // { id: 'DM-006', icon: 'fa fa-paper-plane nav-icon-s', routeLink: 'device/install', routeTitel: '安装区域' }
        ]
    },
    { id: 'SM-000', icon: 'fa fa-wrench nav-icon',  routeLink: 'user',  routeTitel: '系统管理', isCollapsed: true, children: [
            {  id: 'SM-001',  icon: 'fa fa-user-o nav-icon-s',  routeLink: 'user/admin', routeTitel: '用户管理'},
            { id: 'DM-007', name: '客户管理', routeLink: 'user/customer', icon: 'fa fa-user-circle nav-icon-s', routeTitel: '客户管理'},
            { id: 'DM-004', icon: 'fa fa-dropbox nav-icon-s', routeLink: 'user/administration', routeTitel: '行政区域'},
            {  id: 'SM-002',  icon: 'fa fa-user-secret nav-icon-s',  routeLink: 'user/right',  routeTitel: '角色管理'}
        ]
    }

];
