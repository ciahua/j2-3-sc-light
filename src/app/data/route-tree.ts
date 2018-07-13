export const ROUTETREE = [
    {
        id: 1,
        icon: 'fa fa-bell-o nav-icon',
        routeLink: 'monitor',
        routeTitel: '设备监控',
        isCollapsed: false,
        hasRight: true,
    },
    {
        id: 1,
        icon: 'nav-icon fa fa-pie-chart',
        routeLink: 'survey',
        routeTitel: '设备概览',
        isCollapsed: false,
        hasRight: false,
    },
    {
        id: 2,
        icon: 'fa fa-camera-retro nav-icon',
        routeLink: 'device',
        routeTitel: '设备管理',
        isCollapsed: true,
        hasRight: false,
        children: [{
            id: 11,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'device/new-device',
            routeTitel: '新增设备',
        }, {
            id: 12,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'device/add-device',
            routeTitel: '添加设备',
        }, {
            id: 12,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'device/del-device',
            routeTitel: '设备报销',
        }]
    }, {
        id: 3,
        icon: 'fa fa-user-circle-o nav-icon',
        routeLink: 'user',
        routeTitel: '系统管理',
        isCollapsed: true,
        hasRight: true,
        children: [{
            id: 11,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'user/admin',
            routeTitel: '用户管理',
        }, {
            id: 12,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'user/right',
            routeTitel: '权限管理',
        }]
    }, {
        id: 4,
        icon: 'nav-icon fa fa-dashboard',
        routeLink: 'application',
        routeTitel: '用户应用',
        isCollapsed: true,
        hasRight: true,
        children: [{
            id: 21,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'illumination',
            routeTitel: '照明',
        }, {
            id: 21,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'WellCover',
            routeTitel: '井盖',
        },
        {
            id: 21,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'Video',
            routeTitel: '视频',
        },
        {
            id: 21,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'meteorology',
            routeTitel: '气象',
        },
        {
            id: 21,
            icon: 'fa fa-circle-o nav-icon',
            routeLink: 'Visualization',
            routeTitel: '可视化',
        }]
    }, {
        id: 5,
        icon: 'nav-icon fa fa-calendar',
        routeLink: 'logs',
        routeTitel: '日志管理',
        isCollapsed: true,
        hasRight: true,
    }
];
