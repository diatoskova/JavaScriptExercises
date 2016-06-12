//function solve() {
    var domElement = (function () {
        var domElement = {
            init: function (type) {
                this.type = type;
                this.attributes = [];
                this.children = [];
                this.content = '';
                this.parent = null;
                return this;
            },

        };

        function validateAttribute(attr) {
            if (!(typeof attr == 'object' &&
                  attr.hasOwnProperty('name') &&
                  attr.hasOwnProperty('value') &&
                  attr.name.length > 0 &&
                  /^[A-Za-z0-9-]/g.test(attr['name']))) {
                throw new Error('Invalid attribute!');
            }
        }

        function compareStringsByName(a, b) {
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            else
                return 0;
        }

        Object.defineProperty(domElement, 'type', {

            get: function () {
                return this._type;
            },

            set: function (value) {

                if (!(typeof value == 'string') ||
                    !/^[A-Za-z0-9]/g.test(value) ||
                    value == '') {
                    throw new Error('The type must be non empty string containing only letters and numbers.');
                }

                this._type = value;

            }
        });

        Object.defineProperty(domElement, 'children', {

            get: function () {
                return this._children;
            },

            set: function (value) {

                if (!Array.isArray(value) ||
                    value.some(function (child) {
                    return !(typeof child == 'string' || Object.getPrototypeOf(child) === domElement.prototype);
                })) {
                    throw new Error('Invalid children array!');
                }

                this._children = value;
            }
        });

        Object.defineProperty(domElement, 'content', {

            get: function () {
                return this._content;
            },

            set: function (value) {

                if (this.children.length != 0) {
                    return this;
                }
                if (!(typeof value == 'string')) {
                    throw new Error('Invalid content attribute!');
                }

                this._content = value;
            }
        });

        Object.defineProperty(domElement, 'parent', {

            get: function () {
                return this._parent;
            },

            set: function (value) {

                if (!Object.getPrototypeOf(parent) === domElement.prototype) {
                    throw new Error('Invalid parent attribute!');
                }

                this._parent = value;
            }
        });

        Object.defineProperty(domElement, 'attributes', {

            get: function () {
                return this._attributes;
            },

            set: function (value) {

                /*if (!Array.isArray(value) ||
                    value.some(function (attr) {
                        return !(typeof attr == 'object' &&
                                 attr.hasOwnProperty('name') &&
                                 attr.hasOwnProperty('value') &&
                                 attr.name.length > 0 &&
                                 /^[A-Za-z0-9-]/g.test(attr['name']));
                })) {
                    throw new Error('Invalid attributes array!');
                }
                */
                this._attributes = value;
            }
        });
        function getSortedAttributes() {
            if (Array.isArray(this.attributes)) {
                return this.attributes;
            }
        }
        //<type attr1="value1" attr2="value2" ... > ... content / children's.innerHTML</type>
        Object.defineProperty(domElement, 'innerHTML', {

            get: function () {
                var inner = '<' + this.type,
                    i,
                    attr = this.attributes,
                    ch = this.children;

                if (Array.isArray(attr)) {

                    attr = this.attributes;
                    attr.sort(compareStringsByName);
                    //console.log(attr.sort(compareStringsByName));
                    for (i = 0; i < attr.length; i += 1) {

                        inner += ' ' + attr[i].name + '="' + attr[i].value + '"';
                    }

                }
                    inner += '>';
                    if (Array.isArray(ch)) {
                        if (ch.length != 0) {
                            for (i = 0; i < ch.length; i++) {
                                inner += ch[i].innerHTML;
                            }
                        }
                        else {
                            inner += this.content;
                        }
                    }

                    inner += '</' + this.type + '>';
                
                return inner;
            },

            set: function (value) {

                if (!(typeof value == 'string')) {
                    throw new Error('Invalid innerHTML!');
                }

                this._innerHTML = value;
            }
        });

        Object.defineProperty(domElement, 'appendChild', {
            value: function (child) {
                if (!(Object.getPrototypeOf(child) === domElement || (typeof child == 'string'))) {
                    throw new Error('Invalid child');
                }
                if(Array.isArray(this.children))
                    this.children.push(child);
                child.parent = this;

                return this;
            }
        })

        Object.defineProperty(domElement, 'addAttribute', {
            value: function (name, value) {
                var attribute = { name: name, value: value },
                    i;
                validateAttribute(attribute);

               // for (i = 0; i < length; i+=1) {
              //      if(this.attributes[i].name==)
              //  }
               // if (this.attributes.some(function (at) {
              //      return at.name == attribute.name;
               // })) {
               //     throw new Error('Cannot add duplicate attributes!');
               // }
                if (Array.isArray(this.attributes)) {
                    this.attributes.push(attribute);
                }
                return this;
            }


        });

        Object.defineProperty(domElement, 'removeAttribute', {
            value: function (attribute) {
                var i,
                    index;

                /*if (!this.attributes.some(function (at) {
                    return (at.name == attribute.name && at.value == attribute.value);
                })) {
                    throw new Error('Such attribute does not exist!');
                }*/
                if(Array.isArray(this.attributes)){
                    for (i = 0; i < this.attributes.length; i += 1) {
                        if (this.attributes[i].name == attribute.name && this.attributes[i].value == attribute.value) {
                            index = i;
                            break;
                        }
                    }

                    if (index > -1) {
                        delete this.attributes[index];
                    }
                }
                return this;
            }
        });

        return domElement;

    }());
 //   return domElement;
//}
var style = Object.create(domElement)
    .init('style')
    .appendChild('#big {\nfont-size: 144pt;\n}'),
link = Object.create(domElement)
    .init('link')
    .addAttribute('src', 'css/fancy.css'),
meta = Object.create(domElement)
    .init('meta')
    .addAttribute('charset', 'utf-8'),
title = Object.create(domElement)
    .init('title')
    .appendChild('Super-Mega awesome S173'),
script = Object.create(domElement)
    .init('script')
    .addAttribute('lang', 'javascript')
    .appendChild('function init(){}'),
head = Object.create(domElement)
    .init('head')
    .appendChild(meta)
    .appendChild(title)
    .appendChild(link)
    .appendChild(style)
    .appendChild(script),
heading = Object.create(domElement)
    .init('h1'),
luser = Object.create(domElement)
    .init('label')
    .addAttribute('for', 'username')
    .addAttribute('class', 'big'),
lpass = Object.create(domElement)
    .init('label')
    .addAttribute('for', 'password'),
user = Object.create(domElement)
    .init('input')
    .addAttribute('name', 'username')
    .addAttribute('id', 'username')
    .addAttribute('type', 'input')
    .addAttribute('tab-index', 1),
pass = Object.create(domElement)
    .init('input')
    .addAttribute('name', 'password')
    .addAttribute('id', 'password')
    .addAttribute('type', 'password')
    .addAttribute('tab-index', 2),
submit = Object.create(domElement)
    .init('input')
    .addAttribute('type', 'submit')
    .addAttribute('value', 'natis'),
form = Object.create(domElement)
    .init('form')
    .appendChild(luser)
    .appendChild(user)
    .addAttribute('action', 'vlez/mi/u/profila')
    .appendChild(lpass)
    .addAttribute('method', 'post')
    .appendChild(pass)
    .appendChild(submit),
footer = Object.create(domElement)
    .init('footer'),
body = Object.create(domElement)
    .init('body')
    .appendChild(heading)
    .appendChild(form)
    .appendChild('reklamata')
    .appendChild(footer),
html = Object.create(domElement)
    .init('html')
    .appendChild(head)
    .appendChild(body);

    heading.content = 'tova izliza v golemi bukvi';
    head.content = 'tova ne trqbva da izliza';
    luser.content = 'Username: ';
    lpass.content = 'Password: ';
    footer.content = 'stiga tolkoz';
    meta.removeAttribute('charset');
    meta.addAttribute('content', 'HTML,CSS,XML,JavaScript');

    console.log(html.innerHTML);