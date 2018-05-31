var treeData = [
    {
        labelId: 1,
        labelName: '1',
        labelRemark: '1',
        labelNext: [
            {
                labelId: 2,
                labelName: '2',
                labelRemark: '1',
                labelNext: [
                    {
                        labelId: 3,
                        labelName: '3',
                        labelRemark: '1',
                    }
                ]
            }
        ]
    },
]
var defaultTree = {
    id: '#tree',
    data: treeData,
    state: 1,//初始状态，下级是打开还是收起：0:close;1:open,
    add: function () {
        console.log('add')
    },
    remove: function () {
        console.log('remove')
    }
};

function labelTree(options) {
    this.id = options.id;
    this.data = options.data;
    this.state = options.state;
    this.add = options.add;
    this.remove = options.remove;
    this.init();
}

labelTree.prototype = {
    init: function () {
        this.createItem();
        this.itemState();
        this.itemAdd();
        this.itemRemove();
    },
    createItem: function () {
        var item = '';
        for (var i = 0; i < this.data.length; i++) {
            item += '<div class="item">' +
                '<div class="item-header" id="' + this.data[i].labelId + '">' +
                (this.data[i].labelNext ? '<span state="' + this.state + '" class="item-state ' + (this.state ? 'item-open' : 'item-close') + '"></span>' : '') +
                '<p>' + this.data[i].labelName + '</p>' +
                '<div class="item-opration">' +
                '<span class="item-add">+</span>' +
                '<span class="item-remove">-</span>' +
                '</div>' +
                '</div>' +
                (this.data[i].labelNext ? this.next(this.data[i].labelId, this.data[i].labelNext) : '') +
                '</div>';
        }
        $(this.id).append(item);
    },
    next: function (parentId, data) {
        var item = '';
        for (var i = 0; i < data.length; i++) {
            item += '<div class="item">' +
                '<div class="item-header" id="' + data[i].labelId + '">' +
                (data[i].labelNext ? '<span state="' + this.state + '" class="item-state ' + (this.state ? 'item-open' : 'item-close') + '"></span>' : '') +
                '<p>' + data[i].labelName + '</p>' +
                '<div class="item-opration">' +
                '<span class="item-add">+</span>' +
                '<span class="item-remove">-</span>' +
                '</div>' +
                '</div>' +
                (data[i].labelNext ? this.next(data[i].labelId, data[i].labelNext) : '') +
                '</div>';
        }
        return '<div class="next" parentId="' + parentId + '" style="display: ' + (this.state ? 'block' : 'none') + '">' + item + '</div>'
    },
    itemState: function () {
        // $('.item-state')状态：0:close;1:open
        $('.item-state').on('click', function () {
            var state = $(this).attr('state');
            var parentId = $(this).parent('.item-header').attr('id');
            if (state == '0') {
                $(this).removeClass('item-close').addClass('item-open');
                $(this).attr('state', '1');
                $('.next[parentid="' + parentId + '"]').slideDown();
            } else {
                $(this).removeClass('item-open').addClass('item-close');
                $(this).attr('state', '0');
                $('.next[parentid="' + parentId + '"]').slideUp();
            }
        })
    },
    itemAdd: function () {
        var self = this;
        $('.item-add').on('click', function () {
            self.add()
        })
    }, itemRemove: function () {
        var self = this;
        $('.item-remove').on('click', function () {
            self.remove()
        })
    },
};


new labelTree(defaultTree);