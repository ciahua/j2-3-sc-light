// 路由
export const ROUTETREE = [
    {
        id: 1,
        icon: 'fa fa-home nav-icon',
        routeLink: 'homepage',
        routeTitel: '首页',
        isCollapsed: false,
        hasRight: true,
    },
    // {
    //     id: 1,
    //     icon: 'fa fa-home nav-icon',
    //     routeLink: 'dashbord',
    //     routeTitel: '概览',
    //     isCollapsed: false,
    //     hasRight: true,
    // },

    {
        id: 4,
        icon: 'fa  fa-building nav-icon',
        routeLink: 'application',
        routeTitel: '智慧城市',
        isCollapsed: true,
        hasRight: true,
        children: [
            {
                id: 21,
                icon: 'fa fa-bolt nav-icon-s',
                routeLink: 'application/calamity',
                routeTitel: '灾害报警',
            },
            // {
            //     id: 21,
            //     icon: 'fa fa-snowflake-o nav-icon-s',
            //     routeLink: 'application/environment',
            //     routeTitel: '环境监测',
            // },
            {
                id: 21,
                icon: 'fa fa-tint nav-icon-s',
                routeLink: 'application/water',
                routeTitel: '水质监测',
            },
            {
                id: 21,
                icon: 'fa fa-snowflake-o nav-icon-s',
                routeLink: 'application/air',
                routeTitel: '空气质量',
            },
            {
                id: 21,
                icon: 'fa fa-lightbulb-o nav-icon-s',
                routeLink: 'application/light',
                routeTitel: '智慧照明',
            },
            {
                id: 21,
                icon: 'fa fa-life-ring nav-icon-s',
                routeLink: 'application/cover',
                routeTitel: '窨井管理',
            },
            {
                id: 21,
                icon: 'fa fa-shield nav-icon-s',
                routeLink: 'application/security',
                routeTitel: '智慧安防',
            },
            {
                id: 21,
                icon: 'fa fa-car nav-icon-s',
                routeLink: 'application/traffic',
                routeTitel: '智慧交通',
            },
            {
                id: 21,
                icon: 'fa fa-window-maximize nav-icon-s',
                routeLink: 'application/led',
                routeTitel: 'LED控制',
            },


        ]
    },
    {
        id: 1,
        icon: 'fa fa-desktop nav-icon',
        routeLink: 'monitor',
        routeTitel: '设备监控',
        isCollapsed: false,
        hasRight: true,
    },

    {
        id: 1,
        icon: 'fa fa-map nav-icon',
        routeLink: 'device',
        routeTitel: '设备管理',
        isCollapsed: true,
        hasRight: false,
        children: [
            {
                id: 21,
                icon: 'fa fa-window-restore nav-icon-s',
                routeLink: 'device/devices',
                routeTitel: '设备',
            },
            // {
            //     id: 21,
            //     icon: 'fa fa-map-o nav-icon-s',
            //     routeLink: 'device/survey',
            //     routeTitel: '设备',
            // },
            {
                id: 21,
                icon: 'fa fa-product-hunt nav-icon-s',
                routeLink: 'device/product',
                routeTitel: '产品',
            },
            {
                id: 21,
                icon: 'fa fa-map-marker nav-icon-s',
                routeLink: 'device/position',
                routeTitel: '位置',
            },
        ]
    },
    // {
    //     id: 1,
    //     icon: 'fa fa-cogs nav-icon ',
    //     routeLink: 'rule',
    //     routeTitel: '规则设置',
    //     isCollapsed: true,
    //     hasRight: false,
    //     children: [
    //         {
    //             id: 21,
    //             icon: 'fa fa-bullhorn nav-icon-s',
    //             routeLink: 'rule/alert',
    //             routeTitel: '报警规则设置',
    //         },
    //         {
    //             id: 1,
    //             icon: 'fa fa-sliders nav-icon-s ',
    //             routeLink: 'rule/control',
    //             routeTitel: '控制策略设置',
    //             isCollapsed: false,
    //             hasRight: false,
    //         },
    //     ]
    // },

    // {
    //     id: 1,
    //     icon: 'fa fa-bar-chart nav-icon',
    //     routeLink: 'energy',
    //     routeTitel: '能源管理',
    //     isCollapsed: true,
    //     hasRight: false,
    //     children: [
    //         {
    //             id: 21,
    //             icon: 'fa fa-line-chart nav-icon-s',
    //             routeLink: 'energy/report',
    //             routeTitel: '报表',
    //         },
    //         {
    //             id: 21,
    //             icon: 'fa fa-th-list nav-icon-s',
    //             routeLink: 'energy/survey',
    //             routeTitel: '概览',
    //         },
    //     ]
    // },


    {
        id: 3,
        icon: 'fa fa-wrench nav-icon',
        routeLink: 'user',
        routeTitel: '系统管理',
        isCollapsed: true,
        hasRight: true,
        children: [{
            id: 11,
            icon: 'fa fa-user-o nav-icon-s',
            routeLink: 'user/admin',
            routeTitel: '用户管理',
        }, {
            id: 12,
            icon: 'fa fa-user-secret nav-icon-s',
            routeLink: 'user/right',
            routeTitel: '角色管理',
        }]
    },

];
