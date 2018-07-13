export const GUIZTREENODE = [
    {
        name: '设备概览', open: true, children: [
            { name: 'test1_1' }, { name: 'test1_2' }]
    },
    {
        name: '设备监控', open: true, children: [
            { name: 'test2_1' }, { name: 'test2_2' }]
    },
    {
        name: '设备管理', open: true, children: [
            { name: '新增' }, { name: '添加' }, { name: '报销' }]
    },
    {
        name: '系统管理', open: true, children: [
            {
                name: '用户管理', children: [
                    { name: '新增' }, { name: '添加' }, { name: '修改' }
                ]
            },
            {
                name: '权限管理', children: [
                    { name: '新增' }, { name: '添加' }, { name: '修改' }
                ]
            }
        ]
    }
];
