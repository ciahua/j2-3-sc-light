export const COMMUNITYLIST = {
    'code': 0,
    'msg': 'ok',
    'val': {
        'community_list' : [
            {
               'id': '300001',
               'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
               'build_date': '2003\u5e74',
                'lat': '22.496739',
                'lng': '113.920522',
                'parameters': [], // 设备参数
               'prop_num': 2,
               'is_active': 1, // 激活
               'is_online': 1, // 在线
               'is_disabled': 0, // 禁用
               'is_exception': 1, // 异常
               'exception_Information': [], // 异常信息
               'has_child': 1,
               'children': [
                   {
                       'id': '310001',
                       'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                       'prop_num': 2,
                       'is_active': 1, // 激活
                       'is_online': 1, // 在线
                       'is_disabled': 1, // 禁用
                       'is_exception': 0, // 异常
                       'exception_Information': '', // 异常信息
                       'has_child': 1,
                        'children': [
                           {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                           },
                       ],

                   },
                   {
                       'id': '310002',
                       'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                       'prop_num': 2,
                       'is_active': 1, // 激活
                       'is_online': 1, // 在线
                       'is_disabled': 1, // 禁用
                       'is_exception': 0, // 异常
                       'exception_Information': '', // 异常信息
                       'has_child': 1,
                        'children': [
                           {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                           },
                       ],

                   },
                    {
                       'id': '310003',
                       'name': '环境箱',
                       'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                       'build_date': '2003\u5e74',
                       'lat': '22.496739',
                       'lng': '113.920522',
                       'prop_num': 2,
                       'is_active': 1, // 激活
                       'is_online': 1, // 在线
                       'is_disabled': 1, // 禁用
                       'is_exception': 1, // 异常
                       'exception_Information': '', // 异常信息
                       'has_child': 1,
                       'children': [
                           {
                               id: 'WD001',
                               name: '智安纳温度传感器',
                               'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                               'build_date': '2003\u5e74',
                               'lat': '22.496739',
                               'lng': '113.920522',
                               'prop_num': 2,
                               'is_active': 1, // 激活
                               'is_online': 1, // 在线
                               'is_disabled': 1, // 禁用
                               'is_exception': 1, // 异常
                               'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                               'has_child': 0,
                               'parameters': [// 设备参数
                                   {
                                       'name': '温度',
                                       'value': 50,
                                       'Unit': '摄氏度' // 单位
                                   },

                               ],
                           },
                            {
                                id: 'SD001',
                               name: '智安纳湿度传感器',
                               'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                               'build_date': '2003\u5e74',
                               'lat': '22.496739',
                               'lng': '113.920522',
                               'prop_num': 2,
                               'is_active': 1, // 激活
                               'is_online': 1, // 在线
                               'is_disabled': 1, // 禁用
                               'is_exception': 0, // 异常
                               'exception_Information': '', // 异常信息
                               'has_child': 0,
                               'parameters': [// 设备参数
                                   {
                                       'name': '湿度',
                                       'value': 25,
                                       'Unit': '度' // 单位
                                   },

                               ],
                           },
                           {
                               id: 'QT001',
                               name: '智安纳气体传感器',
                               'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                               'build_date': '2003\u5e74',
                               'lat': '22.496739',
                               'lng': '113.920522',
                               'prop_num': 2,
                               'is_active': 1, // 激活
                               'is_online': 1, // 在线
                               'is_disabled': 1, // 禁用
                               'is_exception': 0, // 异常
                               'exception_Information': '', // 异常信息
                               'has_child': 0,
                               'parameters': [// 设备参数
                                   {
                                       'name': '臭氧浓度5',
                                       'value': 5,
                                       'Unit': 'ml/立方米' // 单位
                                   },

                               ],
                           }
                       ],

                    },
                   {
                       'id': '310004',
                       'name': '地震探测器',
                       'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                       'build_date': '2003\u5e74',
                       'lat': '22.496739',
                       'lng': '113.920522',
                       'prop_num': 2,
                       'is_active': 1, // 激活
                       'is_online': 1, // 在线
                       'is_disabled': 1, // 禁用
                       'is_exception': 0, // 异常
                       'exception_Information': '', // 异常信息
                       'has_child': 1,
                       'children': [
                           {
                               'id': 'DZ001',
                               'name': '智安纳地震传感器',
                               'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                               'build_date': '2003\u5e74',
                               'lat': '22.496739',
                               'lng': '113.920522',
                               'prop_num': 2,
                               'is_active': 1, // 激活
                               'is_online': 1, // 在线
                               'is_disabled': 1, // 禁用
                               'is_exception': 0, // 异常
                               'exception_Information': '', // 异常信息
                               'parameters': [// 设备参数
                                   {
                                       'name': '震值',
                                       'value': 0,
                                       'Unit': '' // 单位
                                   },

                               ],
                           },
                       ],

                   },
               ]
            },
            {
                'id': '300002',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                'build_date': '2003\u5e74',
                'lat': '22.496113',
                'lng': '113.920913',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 0, // 禁用
                'is_exception': 1, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496113',
                        'lng': '113.920913',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD002',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496113',
                                'lng': '113.920913',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 10,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496113',
                        'lng': '113.920913',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG002',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496113',
                                'lng': '113.920913',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 20000,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496113',
                        'lng': '113.920913',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD002',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496113',
                                'lng': '113.920913',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 33,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD002',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496113',
                                'lng': '113.920913',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT002',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 4号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496113',
                                'lng': '113.920913',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },

                ]
            },
            {
                'id': '300003',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 沿山路, 21-1号',
                'build_date': '2003\u5e74',
                'lat': '22.49757',
                'lng': '113.920122',
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 1, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 21-1号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49757',
                        'lng': '113.920122',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD003',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 21-1号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49757',
                                'lng': '113.920122',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 21-1号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49757',
                        'lng': '113.920122',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG003',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 21-1号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49757',
                        'lng': '113.920122',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD003',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 21-1号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49757',
                                'lng': '113.920122',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 50,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD003',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 21-1号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49757',
                                'lng': '113.920122',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT003',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 21-1号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49757',
                                'lng': '113.920122',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },

                ]
            },
            {
                'id': '300004',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                'build_date': '2003\u5e74',
                'lat': '22.496885',
                'lng': '113.919952',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 1, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496885',
                        'lng': '113.919952',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD004',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496885',
                                'lng': '113.919952',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496885',
                        'lng': '113.919952',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG004',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496885',
                                'lng': '113.919952',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496885',
                        'lng': '113.919952',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD004',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496885',
                                'lng': '113.919952',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 50,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD004',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496885',
                                'lng': '113.919952',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT004',
                                name: '智安纳气体传感器',
                                 'address': '广东省, 深圳市, 南山区, 沿山路, 17号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496885',
                                'lng': '113.919952',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },

                ]
            },
            {
                'id': '300006',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                'build_date': '2003\u5e74',
                'lat': '22.496393',
                'lng': '113.919781',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 0, // 禁用
                'is_exception': 1, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496393',
                        'lng': '113.919781',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD006',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496393',
                                'lng': '113.919781',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496393',
                        'lng': '113.919781',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG006',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496393',
                                'lng': '113.919781',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496393',
                        'lng': '113.919781',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD006',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496393',
                                'lng': '113.919781',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 50,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496393',
                                'lng': '113.919781',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT006',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496393',
                                'lng': '113.919781',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496393',
                        'lng': '113.919781',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ006',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 11号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496393',
                                'lng': '113.919781',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 0,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300005',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                'build_date': '2003\u5e74',
                'lat': '22.497361',
                'lng': '113.923235',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                        'build_date': '2003\u5e74',
                        'lat': '22.497361',
                        'lng': '113.923235',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD005',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.497361',
                                'lng': '113.923235',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                        'build_date': '2003\u5e74',
                        'lat': '22.497361',
                        'lng': '113.923235',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG005',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                        'build_date': '2003\u5e74',
                        'lat': '22.497361',
                        'lng': '113.923235',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD005',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.497361',
                                'lng': '113.923235',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 33,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD005',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.497361',
                                'lng': '113.923235',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT005',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.497361',
                                'lng': '113.923235',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },

                ]
            },
            {
                'id': '300007',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业五路, 2号',
                'build_date': '2003\u5e74',
                'lat': '22.497632',
                'lng': '113.922642',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 30,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ001',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 0,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300008',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业五路, 4号',
                'build_date': '2003\u5e74',
                'lat': '22.497987',
                'lng': '113.921852',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 30,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ001',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 0,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300009',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业五路, 10号',
                'build_date': '2003\u5e74',
                'lat': '22.498279',
                'lng': '113.921151',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 10号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498279',
                        'lng': '113.921151',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD009',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 10号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498279',
                                'lng': '113.921151',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 10号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498279',
                        'lng': '113.921151',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 10号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498279',
                        'lng': '113.921151',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD009',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 10号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498279',
                                'lng': '113.921151',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 33,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD009',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 10号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498279',
                                'lng': '113.921151',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT009',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 10号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498279',
                                'lng': '113.921151',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },

                ]
            },
            {
                'id': '300010',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                'build_date': '2003\u5e74',
                'lat': '22.49853',
                'lng': '113.920378',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 30,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ001',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 0,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300011',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                'build_date': '2003\u5e74',
                'lat': '22.49557',
                'lng': '113.922229',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49557',
                        'lng': '113.922229',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49557',
                                'lng': '113.922229',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49557',
                        'lng': '113.922229',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49557',
                                'lng': '113.922229',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49557',
                        'lng': '113.922229',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49557',
                                'lng': '113.922229',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 34,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49557',
                                'lng': '113.922229',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49557',
                                'lng': '113.922229',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49557',
                        'lng': '113.922229',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ001',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 南海大道, 1518号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49557',
                                'lng': '113.922229',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 0,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300012',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                'build_date': '2003\u5e74',
                'lat': '22.495863',
                'lng': '113.921515',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                        'build_date': '2003\u5e74',
                        'lat': '22.495863',
                        'lng': '113.921515',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.495863',
                                'lng': '113.921515',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                        'build_date': '2003\u5e74',
                        'lat': '22.495863',
                        'lng': '113.921515',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.495863',
                                'lng': '113.921515',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                        'build_date': '2003\u5e74',
                        'lat': '22.495863',
                        'lng': '113.921515',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 30,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.495863',
                                'lng': '113.921515',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.495863',
                                'lng': '113.921515',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                        'build_date': '2003\u5e74',
                        'lat': '22.495863',
                        'lng': '113.921515',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ001',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 2号',
                                'build_date': '2003\u5e74',
                                'lat': '22.495863',
                                'lng': '113.921515',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 0,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300013',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                'build_date': '2003\u5e74',
                'lat': '22.496388',
                'lng': '113.920419',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496388',
                        'lng': '113.920419',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496388',
                                'lng': '113.920419',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496388',
                        'lng': '113.920419',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496388',
                                'lng': '113.920419',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496388',
                        'lng': '113.920419',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496388',
                                'lng': '113.920419',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 32,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496388',
                                'lng': '113.920419',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                                'build_date': '2003\u5e74',
                                'lat': '22.496388',
                                'lng': '113.920419',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496388',
                        'lng': '113.920419',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ001',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 0,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300014',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                'build_date': '2003\u5e74',
                'lat': '22.498012',
                'lng': '113.922485',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 1, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498012',
                        'lng': '113.922485',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498012',
                                'lng': '113.922485',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498012',
                        'lng': '113.922485',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                'build_date': '2003\u5e74',
                'lat': '22.498012',
                'lng': '113.922485',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498012',
                        'lng': '113.922485',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498012',
                                'lng': '113.922485',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 33,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498012',
                                'lng': '113.922485',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                'build_date': '2003\u5e74',
                'lat': '22.498012',
                'lng': '113.922485',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496388',
                        'lng': '113.920419',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ001',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498012',
                                'lng': '113.922485',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 123,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },

            {
                'id': '300016',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                'build_date': '2003\u5e74',
                'lat': '22.498559',
                'lng': '113.922777',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 1, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498288',
                        'lng': '113.92262',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498288',
                                'lng': '113.92262',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498288',
                        'lng': '113.92262',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498288',
                                'lng': '113.92262',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498288',
                        'lng': '113.92262',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498288',
                                'lng': '113.92262',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 32,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498288',
                                'lng': '113.92262',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498288',
                                'lng': '113.92262',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                        'build_date': '2003\u5e74',
                        'lat': '22.498288',
                        'lng': '113.92262',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ002',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业五路, 30号',
                                'build_date': '2003\u5e74',
                                'lat': '22.498288',
                                'lng': '113.92262',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 155,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300017',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业五路, 8号',
                'build_date': '2003\u5e74',
                'lat': '22.49901',
                'lng': '113.923019',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 1, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 30,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 1, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ003',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 1, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 112,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },
            {
                'id': '300018',
                'name': '井盖',
                'address': '广东省, 深圳市, 南山区, 沿山路, 15号',
                'build_date': '2003\u5e74',
                'lat': '22.496681',
                'lng': '113.919238',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 0, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [

                    {
                        'id': '310181',
                        'name': '井盖',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 15号',
                        'build_date': '2003\u5e74',
                        'lat': '22.496681',
                        'lng': '113.919238',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 0, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'JG001',
                                'name': '智安纳防盗井盖',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 0, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '状态',
                                        'value': '离线',
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],
                    },

                ]
            },
            {
                'id': '300019',
                'name': '井盖',
                'address': '广东省, 深圳市, 南山区, 沿山路, 9-3号',
                'build_date': '2003\u5e74',
                'lat': '22.495395',
                'lng': '113.919166',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 0, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [

                    {
                        'id': '310191',
                        'name': '井盖',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 9-3号',
                        'build_date': '2003\u5e74',
                        'lat': '22.495395',
                        'lng': '113.919166',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 0, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'JG002',
                                'name': '智安纳防盗井盖',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 9-3号',
                                'build_date': '2003\u5e74',
                                'lat': '22.495395',
                                'lng': '113.919166',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 0, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '状态',
                                        'value': '离线',
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],
                    }
                ]
            },
            {
                'id': '300020',
                'name': '灯柱',
                'address': '广东省, 深圳市, 南山区, 工业五路, 14号',
                'build_date': '2003\u5e74',
                'lat': '22.498847',
                'lng': '113.9197',
                'parameters': [], // 设备参数
                'prop_num': 2,
                'is_active': 1, // 激活
                'is_online': 1, // 在线
                'is_disabled': 1, // 禁用
                'is_exception': 0, // 异常
                'exception_Information': [], // 异常信息
                'has_child': 1,
                'children': [
                    {
                        'id': '310001',
                        'name': '灯',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'LD001',
                                'name': '太阳能智能路灯',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '照度',
                                        'value': 50,
                                        'Unit': 'LUX' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310002',
                        'name': '网关',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'WG001',
                                'name': '华为智能网关',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '流量',
                                        'value': 10,
                                        'Unit': 'kb/s' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                    {
                        'id': '310003',
                        'name': '环境箱',
                        'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                        'build_date': '2003\u5e74',
                        'lat': '22.49853',
                        'lng': '113.920378',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                id: 'WD001',
                                name: '智安纳温度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '深圳市南山区蛇口工业4路智安纳温度传感器WD001温度50摄氏度数据异常', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '温度',
                                        'value': 30,
                                        'Unit': '摄氏度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'SD001',
                                name: '智安纳湿度传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '湿度',
                                        'value': 25,
                                        'Unit': '度' // 单位
                                    },

                                ],
                            },
                            {
                                id: 'QT001',
                                name: '智安纳气体传感器',
                                'address': '广东省, 深圳市, 南山区, 沿山路, 27号',
                                'build_date': '2003\u5e74',
                                'lat': '22.49853',
                                'lng': '113.920378',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'has_child': 0,
                                'parameters': [// 设备参数
                                    {
                                        'name': '臭氧浓度5',
                                        'value': 5,
                                        'Unit': 'ml/立方米' // 单位
                                    },

                                ],
                            }
                        ],

                    },
                    {
                        'id': '310004',
                        'name': '地震探测器',
                        'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                        'build_date': '2003\u5e74',
                        'lat': '22.496739',
                        'lng': '113.920522',
                        'prop_num': 2,
                        'is_active': 1, // 激活
                        'is_online': 1, // 在线
                        'is_disabled': 1, // 禁用
                        'is_exception': 0, // 异常
                        'exception_Information': '', // 异常信息
                        'has_child': 1,
                        'children': [
                            {
                                'id': 'DZ001',
                                'name': '智安纳地震传感器',
                                'address': '广东省, 深圳市, 南山区, 工业四路, 6',
                                'build_date': '2003\u5e74',
                                'lat': '22.496739',
                                'lng': '113.920522',
                                'prop_num': 2,
                                'is_active': 1, // 激活
                                'is_online': 1, // 在线
                                'is_disabled': 1, // 禁用
                                'is_exception': 0, // 异常
                                'exception_Information': '', // 异常信息
                                'parameters': [// 设备参数
                                    {
                                        'name': '震值',
                                        'value': 0,
                                        'Unit': '' // 单位
                                    },

                                ],
                            },
                        ],

                    },
                ]
            },

        ],

    }

};



