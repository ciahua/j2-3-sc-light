// 路由
export const ROUTETREE = [
    {
        id: 'HP-000',
        icon: 'fa fa-home nav-icon',
        routeLink: 'homepage',
        routeTitel: '首页',
        isCollapsed: false,
        hasRight: true
    },
    {
        id: 'SC-000',
        icon: 'fa  fa-building nav-icon',
        routeLink: 'application',
        routeTitel: '智慧城市',
        isCollapsed: true,
        hasRight: true,
        children: [
            {
                id: 'SC-001',
                icon: 'fa fa-bolt nav-icon-s',
                routeLink: 'application/calamity',
                routeTitel: '灾害报警'
            },

            {
                id: 'SC-002',
                icon: 'fa fa-tint nav-icon-s',
                routeLink: 'application/water',
                routeTitel: '水质监测'
            },
            {
                id: 'SC-003',
                icon: 'fa fa-eye nav-icon-s',
                routeLink: 'application/electrical',
                routeTitel: '电气安全'
            },
            {
                id: 'SC-004',
                icon: 'fa fa-cloud nav-icon-s',
                routeLink: 'application/air',
                routeTitel: '空气质量'
            },
            {
                id: 'SC-005',
                icon: 'fa fa-lightbulb-o nav-icon-s',
                routeLink: 'application/light',
                routeTitel: '智慧照明'
            },
            {
                id: 'SC-006',
                icon: 'fa fa-life-ring nav-icon-s',
                routeLink: 'application/cover',
                routeTitel: '窨井管理'
            },
            {
                id: 'SC-007',
                icon: 'fa fa-car nav-icon-s',
                routeLink: 'application/traffic',
                routeTitel: '智慧交通'
            },
            {
                id: 'SC-008',
                icon: 'fa fa-window-maximize nav-icon-s',
                routeLink: 'led',
                routeTitel: 'LED控制'
            }


        ]
    },
    {
        id: 'DA-000',
        icon: 'fa fa-desktop nav-icon',
        routeLink: 'monitor',
        routeTitel: '设备监控',
        isCollapsed: false,
        hasRight: true
    },

    {
        id: 'DM-000',
        icon: 'fa fa-map nav-icon',
        routeLink: 'device',
        routeTitel: '设备管理',
        isCollapsed: true,
        hasRight: false,
        children: [
            {
                id: 'DM-001',
                icon: 'fa fa-window-restore nav-icon-s',
                routeLink: 'device/devices',
                routeTitel: '设备'
            },

            {
                id: 'DM-002',
                icon: 'fa fa-product-hunt nav-icon-s',
                routeLink: 'device/product',
                routeTitel: '产品'
            },
            {
                id: 'DM-003',
                icon: 'fa fa-map-marker nav-icon-s',
                routeLink: 'device/position',
                routeTitel: '位置'
            }
        ]
    },
    {
        id: 'SM-000',
        icon: 'fa fa-wrench nav-icon',
        routeLink: 'user',
        routeTitel: '系统管理',
        isCollapsed: true,
        hasRight: true,
        children: [{
            id: 'SM-001',
            icon: 'fa fa-user-o nav-icon-s',
            routeLink: 'user/admin',
            routeTitel: '用户管理'
        }, {
            id: 'SM-002',
            icon: 'fa fa-user-secret nav-icon-s',
            routeLink: 'user/right',
            routeTitel: '角色管理'
        }]
    }

];
