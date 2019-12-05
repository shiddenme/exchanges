const _ = require('lodash');

const code2error = {
  32001: '合约账户被冻结（当用户合约账户被冻结时）',
  32002: '用户合约账户不存在（当用户只是注册了账号没有开通合约）',
  32003: '撤单中，请耐心等待',
  32004: '您当前没有未成交的订单（当用户查询未成交订单时）',
  32005: '超过最大下单量（当用户下单量超过规定数量会出现该异常）',
  32006: '委托价格或触发价格超过100万美元（下单当用户委托价格或触发价格超过100万美元）',
  32007: '合约相同方向只支持一个杠杆，当用户有10倍杠杆的持仓，在开20倍的时候等',
  32008: '当前最多可开仓位（全仓）， 当用户开仓(全仓)的时候大于最多可开仓位',
  32009: '当前最多可开仓位（逐仓），当用户开仓(逐仓)的时候大于最多可开仓位',
  32010: '当前有持仓，无法设置杠杆',
  32011: '虚拟合约状态错误，使用了过期的合约',
  32012: '合约撤单失败，系统异常时，撤单失败',
  32013: '币种类型为空',
  32014: '您的平仓张数大于该仓位的可平张数',
  32015: '开仓前保证金率低，开仓的是保证金率低于100%',
  32016: '开仓后保证金率低，开仓后的是保证金率低于100%',
  32017: '暂无对手价',
  32018: '下单数量不足1张，请重新选择',
  32019: '下单价格高于前一分钟的103%或低于97%',
  32020: '价格不在限价范围内',
  32021: '杠杆比率错误，设置杆杆的时候不是设置的10倍或者20倍',
  32022: '根据相关法律，您所在的国家或地区不能使用该功能，有的地区不能开合约',
  32023: '账户存在借款',
  32024: '合约交割中，无法下单',
  32025: '合约清算中，无法下单，清算的时候无法下单',
  32026: '您的账户已被限制开仓操作，禁止开仓',
  32027: '撤单数量超过20',
  32028: '用户被强平冻结',
  32029: 'client_oid 或order_id只能传一个',
  32030: '该委托类型无法进行撤单操作',
  32031: 'client_oid 或者 order_id是必要的参数',
  32038: '用户不存在',
  32040: '用户存在挂单或持仓',
  32041: '当前仓位不存在',
  32042: '超过保证金最大最小限额',
  32043: '账户模式不正确',
  32044: '下单后保证金率小于对应档位要求的最低保证金率',
  32045: '委托数量超过100万',
  32046: '每个用户最多可同时持有10笔未成交的止盈止损',
  32047: '系统错误（当合约暂停或者极端情况会出现）',
  32048: '跟踪委托回调幅度错误',
  32049: '每个用户最多可同时持有10笔未成交的跟踪委托',
  32050: '回调幅度错误',
  32051: '冰山委托深度错误',
  32052: '委托数量超过10万',
  32053: '每个用户最多可同时持有6笔未成交的冰山委托',
  32054: '禁止开仓',
  32055: '撤单失败',
  32056: '冰山委托单笔均值',
  32057: '委托价为0，暂无法进行市价全平操作',
  32058: '每个用户最多可同时持有6笔未成交的时间加权',
  32059: '委托总数量需大于单笔上限',
  32060: '下单类型错误',
  32061: '时间加权单笔上限错误（时间加权单笔上线错误）',
  32062: '时间加权扫单范围出错',
  32063: '时间加权扫单比例出错',
  32064: '委托间隔错误，5-120s之间',
  32065: '市价全平的数量大于阈值（BTC 最多为 999 张，其他合约未 9999 张）',
  32066: '当前存在挂单，请撤销所有挂单后进行杠杆倍数修改',
  32067: '调整后，账户权益<所需保证金，请重新调整杠杆倍数',
  32068: '调整后本仓位保证金不足开仓所需保证金，请重新调整杠杆倍数或追加保证金后调整',
  32069: '杠杆倍数过低，账户中没有足够的可用保证金可以追加（请重新调整杠杆倍数）',
  32070: '用户有持仓或者挂单（取消持仓或挂单）',
  32071: '您的当前强平模型不支持此操作',
  32072: '您下单后仓位总张数所处档位的最高可用杠杆为{0}（请修改杠杆后重新下单）',
  32073: '当前币种不支持此操作',
  32074: '您当前持仓、开仓挂单及本次下单张数已超过该币种最大限制可开张数',
  32075: '账户风险率过高',
  32076: '市价全平需先进行撤销平仓挂单操作（市价全平需先进行撤销平仓挂单操作）',
  32077: '您该币种合约账户保证金不足，已触发强制平仓',
  32078: '您在该币种下存在挂单，请撤销所有挂单后切换',
  32079: '当前仓位风险过高，请增加保证金或减少仓位后切换',
  32080: '交割结算后30分钟内不能转出',
  35008: '账户风险率过高，用户下单前后保证金率不足',
  35010: '平仓数量大于可平数量（用户下平仓单数量大于可平数量时）',
  33001: '没有开通该币种杠杆业务时调接口会报错',
  33002: '杠杆账户被冻结',
  33003: '没有足够的余额进行借币',
  33004: '借币时借币的数量',
  33005: '还款金额不对',
  33006: '还币或者查询的时候没有借币订单会报此错误',
  33007: '没有该状态值',
  33008: '借币的数量不合法',
  33009: 'user ID为空',
  33010: '集合竞价时候不可以撤单',
  33011: '没有行情数据',
  33012: '撤单失败',
  33013: '下单失败',
  33014: '重复撤单，订单号不对等',
  33015: '批量下单，批量撤单时候会出现',
  33016: '币对没有开通杠杆业务',
  33017: '下单余额不足',
  33018: '获取深度接口时参数不对',
  33020: '有些交易所不支持杠杆业务',
  33021: '还币时币与币对不匹配',
  33022: '还币时币与订单不匹配',
  33023: '集合竞价时只可以下市价单',
  33024: '下单时交易金额不对',
  33026: '撤单时完成交易的订单不能撤单',
  33027: '撤单时已经撤销和撤销中的订单不能撤单',
  33028: '下单时金额小数位超过限制',
  33029: '下单时数量小数位超过限制',
};

const code2errorFuture = {
  20108: '必选参数不能为空',
  20109: '参数错误',
  20001: '用户不存在',
  20002: '用户被冻结',
  20004: '合约账户被冻结',
  20009: '虚拟合约状态错误',
  20005: '用户合约账户不存在',
  20080: '撤单中，请耐心等待',
  20015: '您当前没有未成交的订单',
  20017: '非本人操作',
  20057: '合约订单更新错误',
  20014: '系统错误',
  21001: '币种类型为空',
  21002: '币种类型错误',
  20007: '参数错误',
  20111: '最大下单量为',
  20032: '委托价格或触发价格超过100万美元',
  21016: '合约相同方向只支持一个杠杆',
  21023: '您当前方向仓位最多还可开{%s%}张',
  21024: '您当前方向仓位最多还可开{%s%}./张',
  20025: '杠杆比率错误',
  20095: '您当前有持仓或挂单，无法设置杠杆',
  32001: '当用户合约账户被冻结时',
  32002: '当用户只是注册了账号没有开通合约',
  32003: '当用户撤单时，进行其他操作',
  32004: '当用户查询未成交订单时',
  32005: '当用户下单量超过规定数量会出现该异常',
  32006: '下单当用户委托价格或触发价格超过100万美元',
  32007: '当用户有10倍杠杆的持仓，在开20倍的时候等',
  32008: '当用户开仓(全仓)的时候大于最多可开仓位',
  32009: '当用户开仓(逐仓)的时候大于最多可开仓位',
  32010: '例如当用户10倍杠杆开空持仓，在设置杠杆时，不能在改成20 倍杠杆',
  32011: '使用了过期的合约',
  32012: '撤单完订单状态更新',
  32013: '币种类型为空',
  32014: '您的平仓张数大于该仓位的可平张数',
  32015: '开仓的是保证金率低于100%',
  32016: '开仓后的是保证金率低于100%',
  32017: '没有对手价格',
  32018: '下单size 小于1',
  32019: '开多的时候超过103% 开低的时候低于97%',
  32020: '价格不在限价范围内',
  32021: '设置杆杆的时候不是设置的10倍或者20倍',
  32022: '有的地区不能开合约',
  32023: '账户存在借款',
  32024: '交割的时候无法下单',
  32025: '清算的时候无法下单',
  32026: '禁止开仓',
  32029: '重复撤单，撤的订单不对等',
  32028: '用户爆仓冻结',
  32027: '撤单的时候数量超过限制',
};

const code2errorMargin = {
  33001: '没有开通该币种杠杆业务时调接口会报错',
  33002: '杠杆账户被冻结',
  33003: '没有足够的余额进行借币',
  33004: '借币时借币的数量',
  33005: '还款金额不对',
  33006: '还币或者查询的时候没有借币订单会报此错误',
  33007: '没有该状态值',
  33008: '借币的数量不合法',
  33009: 'user ID为空',
  33010: '集合竞价时候不可以撤单',
  33011: '没有行情数据',
  33012: '撤单失败',
  33013: '下单失败',
  33014: '重复撤单，订单号不对等',
  33015: '批量下单，批量撤单时候会出现',
  33016: '币对没有开通杠杆业务',
  33017: '下单余额不足',
  33018: '获取深度接口时参数不对',
  33020: '有些交易所不支持杠杆业务',
  33021: '还币时币与币对不匹配',
  33022: '还币时币与订单不匹配',
  33023: '集合竞价时只可以下市价单',
  33024: '下单时交易金额不对',
  33025: '下单时上币时候币对配置不全',
  33026: '撤单时完成交易的订单不能撤单',
  33027: '撤单时已经撤销和撤销中的订单不能撤单',
  33028: '下单时金额小数位超过限制',
  33029: '下单时数量小数位超过限制',
};
const code2errorWebsoket = {
  10000: '必填参数为空',
  10001: '参数错误',
  10002: '验证失败',
  10003: '该连接已经请求了其他用户的实时交易数据',
  10004: '该连接没有请求此用户的实时交易数据',
  10005: 'api_key或者sign不合法',
  10008: '非法参数',
  10009: '订单不存在',
  10010: '余额不足',
  10011: '卖的数量小于BTC/LTC最小买卖额度',
  10012: '当前网站暂时只支持btc_usd ltc_usd',
  10014: '下单价格不得≤0或≥1000000',
  10015: '暂不支持此channel订阅',
  10016: '币数量不足',
  10017: 'WebSocket鉴权失败',
  10100: '用户被冻结',
  10049: '小额委托（<0.15BTC)的未成交委托数量不得大于50个',
  10216: '非开放API',
  20001: '用户不存在',
  20002: '用户被冻结',
  20003: '用户被爆仓冻结',
  20004: '合约账户被冻结',
  20005: '用户合约账户不存在',
  20006: '必填参数为空',
  20007: '参数错误',
  20008: '合约账户余额为空',
  20009: '虚拟合约状态错误',
  20010: '合约风险率信息不存在',
  20011: '开仓前保证金率超过90%',
  20012: '开仓后保证金率超过90%',
  20013: '暂无对手价',
  20014: '系统错误',
  20015: '订单信息不存在',
  20016: '平仓数量是否大于同方向可用持仓数量',
  20017: '非本人操作',
  20018: '下单价格高于前一分钟的105%或低于95%',
  20019: '该IP限制不能请求该资源',
  20020: '密钥不存在',
  20021: '指数信息不存在',
  20022: '接口调用错误',
  20023: '逐仓用户',
  20024: 'sign签名不匹配',
  20025: '杠杆比率错误',
  20100: '请求超时',
  20101: '数据格式无效',
  20102: '登录无效',
  20103: '数据事件类型无效',
  20104: '数据订阅类型无效',
  20107: 'JSON格式错误',
  20115: 'quote参数未匹配到',
  20116: '参数不匹配',
  1002: '交易金额大于余额',
  1003: '交易金额小于最小交易值',
  1004: '交易金额小于0',
  1007: '没有交易市场信息',
  1008: '没有最新行情信息',
  1009: '没有订单',
  1010: '撤销订单与原订单用户不一致',
  1011: '没有查询到该用户',
  1013: '没有订单类型',
  1014: '没有登录',
  1015: '没有获取到行情深度信息',
  1017: '日期参数错误',
  1018: '下单失败',
  1019: '撤销订单失败',
  1024: '币种不存在',
  1025: '没有K线类型',
  1026: '没有基准币数量',
  1027: '参数不合法可能超出限制',
  1028: '保留小数位失败',
  1029: '正在准备中',
  1030: '有融资融币无法进行交易',
  1031: '转账余额不足',
  1032: '该币种不能转账',
  1035: '密码不合法',
  1036: '谷歌验证码不合法',
  1037: '谷歌验证码不正确',
  1038: '谷歌验证码重复使用',
  1039: '短信验证码输错限制',
  1040: '短信验证码不合法',
  1041: '短信验证码不正确',
  1042: '谷歌验证码输错限制',
  1043: '登陆密码不允许与交易密码一致',
  1044: '原密码错误',
  1045: '未设置二次验证',
  1046: '原密码未输入',
  1048: '用户被冻结',
  1050: '订单已撤销或者撤销中',
  1051: '订单已完成交易',
  1201: '账号零时删除',
  1202: '账号不存在',
  1203: '转账金额大于余额',
  1204: '不同种币种不能转账',
  1205: '账号不存在主从关系',
  1206: '提现用户被冻结',
  1207: '不支持转账',
  1208: '没有该转账用户',
  1209: '当前api不可用',
};

const errorAddOn = {
  '-6': '可能是资金划转时没有足够的余额'
};

const allCode2Error = { ...code2error, ...code2errorFuture, ...code2errorMargin, ...code2errorWebsoket, ...errorAddOn };

function getErrorFromCode(code) {
  return allCode2Error[code] || `code: ${code} 暂时不知道错误原因`;
}
//
module.exports = {
  getErrorFromCode
};
