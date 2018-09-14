export const ROUTELIST = [
    { // 三列
        id: 1,
        col: 'col-5 dash-pad',
        row: [ // 三行
            {
                id: 11,
                children: [
                    {
                        id: 11,
                        col: 'col-4',
                        class: 'row  align-items-center justify-content-center dash-item-first',
                        icon: 'fa  fa-building',
                        routeLink: '/home/homepage',
                        routeTitel: '智慧城市',
                        hasClick: true,
                    },
                    {
                        id: 11,
                        col: 'col-8',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-bolt',
                        routeLink: 'home/application/calamity',
                        routeTitel: '灾害报警',
                    },


                ]
            },
            {
                id: 11,
                children: [
                    {
                        id: 11,
                        col: 'col-3',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-tint',
                        routeLink: 'home/application/water',
                        routeTitel: '水质监测',
                    },
                    {
                        id: 11,
                        col: 'col-6',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-snowflake-o',
                        routeLink: 'home/application/air',
                        routeTitel: '空气质量',
                    },
                    {
                        id: 11,
                        col: 'col-3',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-lightbulb-o',
                        routeLink: 'home/application/light',
                        routeTitel: '智慧照明',
                    },

                ]
            },
            {
                id: 11,
                children: [
                    {
                        id: 11,
                        col: 'col-8',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-life-ring',
                        routeLink: 'home/application/cover',
                        routeTitel: '窨井管理',
                    },

                    {
                        id: 11,
                        col: 'col-4',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-car',
                        routeLink: 'home/application/traffic',
                        routeTitel: '智慧交通',
                    },
                ]
            }
        ]

    },
    {
        id: 2,
        col: 'col-5 dash-pad',
        row: [
            {
                id: 11,
                children: [
                    {
                        id: 11,
                        col: 'col-8',
                        class: 'row  align-items-center justify-content-center dash-item-first',
                        icon: 'fa fa-map nav-icon',
                        routeLink: '/home/homepage',
                        routeTitel: '设备管理',
                        hasClick: true,
                    },
                    {
                        id: 11,
                        col: 'col-4',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-desktop nav-icon',
                        routeLink: 'home/monitor',
                        routeTitel: '设备监控',
                    },


                ]
            },
            {
                id: 11,
                children: [
                    {
                        id: 11,
                        col: 'col-12',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-window-restore nav-icon-s',
                        routeLink: 'home/device/devices',
                        routeTitel: '设备',
                    },

                ]
            },
            {
                id: 11,
                children: [
                    {
                        id: 11,
                        col: 'col-4',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-product-hunt nav-icon-s',
                        routeLink: 'home/device/product',
                        routeTitel: '产品',
                    },

                    {
                        id: 11,
                        col: 'col-8',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-map-marker nav-icon-s',
                        routeLink: 'home/device/position',
                        routeTitel: '位置',
                    },
                ]
            }
        ]

    },
    {
        id: 3,
        col: 'col-2 dash-pad',
        row: [
            {
                id: 11,
                children: [
                    {
                        id: 11,
                        col: 'col-12',
                        class: 'row  align-items-center justify-content-center dash-item-first',
                        icon: 'fa fa-wrench nav-icon',
                        routeLink: '/home/homepage',
                        routeTitel: '系统管理',
                    },


                ]
            },
            {
                id: 11,
                children: [
                    {
                        id: 11,
                        col: 'col-12',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-user-o nav-icon-s',
                        routeLink: 'home/user/admin',
                        routeTitel: '用户管理',
                    },

                ]
            },
            {
                id: 11,
                children: [
                    {
                        id: 12,
                        col: 'col-12',
                        class: 'row  align-items-center justify-content-center dash-item',
                        icon: 'fa fa-user-secret nav-icon-s',
                        routeLink: 'home/user/right',
                        routeTitel: '角色管理',
                    },

                ]
            }
        ]

    }

];
