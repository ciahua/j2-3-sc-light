export const ROUTETREE = [
    {
        id: 1,
        icon: 'fa fa-desktop nav-icon',
        routeLink: 'monitor',
        routeTitel: '操作台',
        isCollapsed: false,
        hasRight: true,
    },
    {
        id: 1,
        icon: 'fa fa-bullhorn nav-icon ',
        routeLink: 'alert',
        routeTitel: '报警规则设置',
        isCollapsed: false,
        hasRight: false,
    },
    {
        id: 1,
        icon: 'fa fa-sliders nav-icon ',
        routeLink: 'control',
        routeTitel: '控制策略设置',
        isCollapsed: false,
        hasRight: false,
    },
    {
        id: 1,
        icon: 'fa fa-bar-chart nav-icon',
        routeLink: 'energy',
        routeTitel: '能源管理',
        isCollapsed: true,
        hasRight: false,
        children: [
            {
                id: 21,
                icon: 'fa fa-th-list nav-icon-s',
                routeLink: 'energy/survey',
                routeTitel: '概览',
            }, {
                id: 21,
                icon: 'fa fa-line-chart nav-icon-s',
                routeLink: 'energy/report',
                routeTitel: '报表',
            },
        ]
    },

    {
        id: 4,
        icon: 'fa fa-th-large nav-icon',
        routeLink: 'application',
        routeTitel: '应用后台管理',
        isCollapsed: true,
        hasRight: true,
        children: [
            {
                id: 21,
                icon: 'fa fa-life-ring nav-icon-s',
                routeLink: 'application/cover',
                routeTitel: '井盖监控',
            }, {
                id: 21,
                icon: 'fa fa-bolt nav-icon-s',
                routeLink: 'application/calamity',
                routeTitel: '灾害预警',
            },
        ]
    },
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
    // {
    //     id: 2,
    //     icon: 'fa fa-camera-retro nav-icon',
    //     routeLink: 'device',
    //     routeTitel: '设备管理',
    //     isCollapsed: true,
    //     hasRight: false,
    //     children: [{
    //         id: 11,
    //         icon: 'fa fa-circle-o nav-icon',
    //         routeLink: 'device/new-device',
    //         routeTitel: '新增设备',
    //     }, {
    //         id: 12,
    //         icon: 'fa fa-circle-o nav-icon',
    //         routeLink: 'device/add-device',
    //         routeTitel: '添加设备',
    //     }, {
    //         id: 12,
    //         icon: 'fa fa-circle-o nav-icon',
    //         routeLink: 'device/del-device',
    //         routeTitel: '设备报销',
    //     }]
    // },
    //  {
    //     id: 5,
    //     icon: 'nav-icon fa fa-calendar',
    //     routeLink: 'logs',
    //     routeTitel: '日志管理',
    //     isCollapsed: true,
    //     hasRight: true,
    // }
];
