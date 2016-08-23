/*!
 * jQuery QueryBuilder 2.3.3
 * Copyright 2014-2016 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define("jQuery.extendext", ["jquery"], b) : b(a.jQuery)
}(this, function($) {
    "use strict";
    $.extendext = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1,
            k = "default";
        for ("boolean" == typeof g && (j = g, g = arguments[h++] || {}), "string" == typeof g && (k = $([g.toLowerCase(), "default"]).filter(["default", "concat", "replace", "extend"])[0], g = arguments[h++] || {}), "object" == typeof g || $.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null !== (a = arguments[h]))
                if ($.isArray(a) && "default" !== k) switch (f = g && $.isArray(g) ? g : [], k) {
                    case "concat":
                        g = f.concat($.extend(j, [], a));
                        break;
                    case "replace":
                        g = $.extend(j, [], a);
                        break;
                    case "extend":
                        a.forEach(function(a, b) {
                            if ("object" == typeof a) {
                                var c = $.isArray(a) ? [] : {};
                                f[b] = $.extendext(j, k, f[b] || c, a)
                            } else -1 === f.indexOf(a) && f.push(a)
                        }), g = f
                } else
                    for (b in a) c = g[b], d = a[b], g !== d && (j && d && ($.isPlainObject(d) || (e = $.isArray(d))) ? (e ? (e = !1, f = c && $.isArray(c) ? c : []) : f = c && $.isPlainObject(c) ? c : {}, g[b] = $.extendext(j, k, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }
}),
function() {
    "use strict";

    function a(b, c, d) {
        return ("string" == typeof c ? c : c.toString()).replace(b.define || f, function(a, c, e, f) {
            return 0 === c.indexOf("def.") && (c = c.substring(4)), c in d || (":" === e ? (b.defineParams && f.replace(b.defineParams, function(a, b, e) {
                d[c] = {
                    arg: b,
                    text: e
                }
            }), c in d || (d[c] = f)) : new Function("def", "def['" + c + "']=" + f)(d)), ""
        }).replace(b.use || f, function(c, e) {
            b.useParams && (e = e.replace(b.useParams, function(a, b, c, e) {
                if (d[c] && d[c].arg && e) {
                    var f = (c + ":" + e).replace(/'|\\/g, "_");
                    return d.__exp = d.__exp || {}, d.__exp[f] = d[c].text.replace(new RegExp("(^|[^\\w$])" + d[c].arg + "([^\\w$])", "g"), "$1" + e + "$2"), b + "def.__exp['" + f + "']"
                }
            }));
            var f = new Function("def", "return " + e)(d);
            return f ? a(b, f, d) : f
        })
    }

    function b(a) {
        return a.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
    }
    var c, d = {
        version: "1.0.3",
        templateSettings: {
            evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
            interpolate: /\{\{=([\s\S]+?)\}\}/g,
            encode: /\{\{!([\s\S]+?)\}\}/g,
            use: /\{\{#([\s\S]+?)\}\}/g,
            useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
            define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
            defineParams: /^\s*([\w$]+):([\s\S]+)/,
            conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
            iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
            varname: "it",
            strip: !0,
            append: !0,
            selfcontained: !1,
            doNotSkipEncoded: !1
        },
        template: void 0,
        compile: void 0
    };
    d.encodeHTMLSource = function(a) {
        var b = {
                "&": "&#38;",
                "<": "&#60;",
                ">": "&#62;",
                '"': "&#34;",
                "'": "&#39;",
                "/": "&#47;"
            },
            c = a ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
        return function(a) {
            return a ? a.toString().replace(c, function(a) {
                return b[a] || a
            }) : ""
        }
    }, c = function() {
        return this || (0, eval)("this")
    }(), "undefined" != typeof module && module.exports ? module.exports = d : "function" == typeof define && define.amd ? define("doT", function() {
        return d
    }) : c.doT = d;
    var e = {
            append: {
                start: "'+(",
                end: ")+'",
                startencode: "'+encodeHTML("
            },
            split: {
                start: "';out+=(",
                end: ");out+='",
                startencode: "';out+=encodeHTML("
            }
        },
        f = /$^/;
    d.template = function(g, h, i) {
        h = h || d.templateSettings;
        var j, k, l = h.append ? e.append : e.split,
            m = 0,
            n = h.use || h.define ? a(h, g, i || {}) : g;
        n = ("var out='" + (h.strip ? n.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : n).replace(/'|\\/g, "\\$&").replace(h.interpolate || f, function(a, c) {
            return l.start + b(c) + l.end
        }).replace(h.encode || f, function(a, c) {
            return j = !0, l.startencode + b(c) + l.end
        }).replace(h.conditional || f, function(a, c, d) {
            return c ? d ? "';}else if(" + b(d) + "){out+='" : "';}else{out+='" : d ? "';if(" + b(d) + "){out+='" : "';}out+='"
        }).replace(h.iterate || f, function(a, c, d, e) {
            return c ? (m += 1, k = e || "i" + m, c = b(c), "';var arr" + m + "=" + c + ";if(arr" + m + "){var " + d + "," + k + "=-1,l" + m + "=arr" + m + ".length-1;while(" + k + "<l" + m + "){" + d + "=arr" + m + "[" + k + "+=1];out+='") : "';} } out+='"
        }).replace(h.evaluate || f, function(a, c) {
            return "';" + b(c) + "out+='"
        }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), j && (h.selfcontained || !c || c._encodeHTML || (c._encodeHTML = d.encodeHTMLSource(h.doNotSkipEncoded)), n = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + d.encodeHTMLSource.toString() + "(" + (h.doNotSkipEncoded || "") + "));" + n);
        try {
            return new Function(h.varname, n)
        } catch (o) {
            throw "undefined" != typeof console && console.log("Could not create a template function: " + n), o
        }
    }, d.compile = function(a, b) {
        return d.template(a, null, b)
    }
}(),
function(a, b) {
    "function" == typeof define && define.amd ? define("query-builder", ["jquery", "doT", "jQuery.extendext"], b) : b(a.jQuery, a.doT)
}(this, function($, a) {
    "use strict";

    function b(a) {
        return this instanceof b ? (this.root = null, void(this.$ = $(this))) : b.getModel(a)
    }

    function c(a, b) {
        b.forEach(function(b) {
            Object.defineProperty(a.prototype, b, {
                enumerable: !0,
                get: function() {
                    return this.__[b]
                },
                set: function(a) {
                    var c = null !== this.__[b] && "object" == typeof this.__[b] ? $.extend({}, this.__[b]) : this.__[b];
                    this.__[b] = a, null !== this.model && this.model.trigger("update", this, b, a, c)
                }
            })
        })
    }

    function d(a, b) {
        if (null !== a && "object" == typeof a) {
            var c = Object.keys(a);
            return 1 === c.length ? c[0] : void 0 !== a.$gte && void 0 !== a.$lte ? "between" : void 0 !== a.$lt && void 0 !== a.$gt ? "not_between" : void 0 !== a.$regex ? "$regex" : void 0
        }
        return "eq"
    }

    function e(a, c) {
        var d;
        return d = c.closest(h.rule_container), d.length ? void a.moveAfter(b(d)) : (d = c.closest(h.group_header), d.length ? (d = c.closest(h.group_container), void a.moveAtBegin(b(d))) : (d = c.closest(h.group_container), d.length ? void a.moveAtEnd(b(d)) : void 0))
    }

    function f(a) {
        var b = a.match(/(question_mark|numbered|named)(?:\((.)\))?/);
        return b || (b = [null, "question_mark", void 0]), b
    }
    var g = function(a, b) {
        this.init(a, b)
    };
    $.extend(g.prototype, {
        change: function(a, b) {
            var c = new $.Event(a + ".queryBuilder.filter", {
                builder: this,
                value: b
            });
            return this.$el.triggerHandler(c, Array.prototype.slice.call(arguments, 2)), c.value
        },
        trigger: function(a) {
            var b = new $.Event(a + ".queryBuilder", {
                builder: this
            });
            return this.$el.triggerHandler(b, Array.prototype.slice.call(arguments, 1)), b
        },
        on: function(a, b) {
            return this.$el.on(a + ".queryBuilder", b), this
        },
        off: function(a, b) {
            return this.$el.off(a + ".queryBuilder", b), this
        },
        once: function(a, b) {
            return this.$el.one(a + ".queryBuilder", b), this
        }
    }), g.plugins = {}, g.defaults = function(a) {
        return "object" != typeof a ? "string" == typeof a ? "object" == typeof g.DEFAULTS[a] ? $.extend(!0, {}, g.DEFAULTS[a]) : g.DEFAULTS[a] : $.extend(!0, {}, g.DEFAULTS) : void $.extendext(!0, "replace", g.DEFAULTS, a)
    }, g.define = function(a, b, c) {
        g.plugins[a] = {
            fct: b,
            def: c || {}
        }
    }, g.extend = function(a) {
        $.extend(g.prototype, a)
    }, g.prototype.initPlugins = function() {
        if (this.plugins) {
            if ($.isArray(this.plugins)) {
                var a = {};
                this.plugins.forEach(function(b) {
                    a[b] = null
                }), this.plugins = a
            }
            Object.keys(this.plugins).forEach(function(a) {
                a in g.plugins ? (this.plugins[a] = $.extend(!0, {}, g.plugins[a].def, this.plugins[a] || {}), g.plugins[a].fct.call(this, this.plugins[a])) : l.error("Config", 'Unable to find plugin "{0}"', a)
            }, this)
        }
    }, g.types = {
        string: "string",
        integer: "number",
        "double": "number",
        date: "datetime",
        time: "datetime",
        datetime: "datetime",
        "boolean": "boolean"
    }, g.inputs = ["text", "textarea", "radio", "checkbox", "select"], g.modifiable_options = ["display_errors", "allow_groups", "allow_empty", "default_condition", "default_filter"];
    var h = g.selectors = {
        group_container: ".rules-group-container",
        rule_container: ".rule-container",
        filter_container: ".rule-filter-container",
        operator_container: ".rule-operator-container",
        value_container: ".rule-value-container",
        error_container: ".error-container",
        condition_container: ".rules-group-header .group-conditions",
        rule_header: ".rule-header",
        group_header: ".rules-group-header",
        group_actions: ".group-actions",
        rule_actions: ".rule-actions",
        rules_list: ".rules-group-body>.rules-list",
        group_condition: ".rules-group-header [name$=_cond]",
        rule_filter: ".rule-filter-container [name$=_filter]",
        rule_operator: ".rule-operator-container [name$=_operator]",
        rule_value: ".rule-value-container [name*=_value_]",
        add_rule: "[data-add=rule]",
        delete_rule: "[data-delete=rule]",
        add_group: "[data-add=group]",
        delete_group: "[data-delete=group]"
    };
    g.templates = {}, g.regional = {}, g.OPERATORS = {
            equal: {
                type: "equal",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["string", "number", "datetime", "boolean"]
            },
            not_equal: {
                type: "not_equal",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["string", "number", "datetime", "boolean"]
            },
            "in": {
                type: "in",
                nb_inputs: 1,
                multiple: !0,
                apply_to: ["string", "number", "datetime"]
            },
            not_in: {
                type: "not_in",
                nb_inputs: 1,
                multiple: !0,
                apply_to: ["string", "number", "datetime"]
            },
            less: {
                type: "less",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["number", "datetime"]
            },
            less_or_equal: {
                type: "less_or_equal",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["number", "datetime"]
            },
            greater: {
                type: "greater",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["number", "datetime"]
            },
            greater_or_equal: {
                type: "greater_or_equal",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["number", "datetime"]
            },
            between: {
                type: "between",
                nb_inputs: 2,
                multiple: !1,
                apply_to: ["number", "datetime"]
            },
            not_between: {
                type: "not_between",
                nb_inputs: 2,
                multiple: !1,
                apply_to: ["number", "datetime"]
            },
            begins_with: {
                type: "begins_with",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["string"]
            },
            not_begins_with: {
                type: "not_begins_with",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["string"]
            },
            contains: {
                type: "contains",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["string"]
            },
            not_contains: {
                type: "not_contains",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["string"]
            },
            ends_with: {
                type: "ends_with",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["string"]
            },
            not_ends_with: {
                type: "not_ends_with",
                nb_inputs: 1,
                multiple: !1,
                apply_to: ["string"]
            },
            is_empty: {
                type: "is_empty",
                nb_inputs: 0,
                multiple: !1,
                apply_to: ["string"]
            },
            is_not_empty: {
                type: "is_not_empty",
                nb_inputs: 0,
                multiple: !1,
                apply_to: ["string"]
            },
            is_null: {
                type: "is_null",
                nb_inputs: 0,
                multiple: !1,
                apply_to: ["string", "number", "datetime", "boolean"]
            },
            is_not_null: {
                type: "is_not_null",
                nb_inputs: 0,
                multiple: !1,
                apply_to: ["string", "number", "datetime", "boolean"]
            }
        }, g.DEFAULTS = {
            filters: [],
            plugins: [],
            sort_filters: !1,
            display_errors: !0,
            allow_groups: -1,
            allow_empty: !1,
            conditions: ["AND", "OR"],
            default_condition: "AND",
            inputs_separator: " , ",
            select_placeholder: "------",
            display_empty_filter: !0,
            default_filter: null,
            optgroups: {},
            default_rule_flags: {
                filter_readonly: !1,
                operator_readonly: !1,
                value_readonly: !1,
                no_delete: !1
            },
            default_group_flags: {
                condition_readonly: !1,
                no_delete: !1
            },
            templates: {
                group: null,
                rule: null,
                filterSelect: null,
                operatorSelect: null
            },
            lang_code: "en",
            lang: {},
            operators: ["equal", "not_equal", "in", "not_in", "less", "less_or_equal", "greater", "greater_or_equal", "begins_with",  "contains", "ends_with", "is_empty", "is_not_empty", "is_null", "is_not_null"],
            icons: {
                add_group: "glyphicon glyphicon-plus-sign",
                add_rule: "glyphicon glyphicon-plus",
                remove_group: "glyphicon glyphicon-remove",
                remove_rule: "glyphicon glyphicon-remove",
                error: "glyphicon glyphicon-warning-sign"
            }
        }, g.prototype.init = function(c, d) {
            c[0].queryBuilder = this, this.$el = c, this.settings = $.extendext(!0, "replace", {}, g.DEFAULTS, d), this.model = new b, this.status = {
                group_id: 0,
                rule_id: 0,
                generated_id: !1,
                has_optgroup: !1,
                has_operator_oprgroup: !1,
                id: null,
                updating_value: !1
            }, this.settings.allow_groups === !1 ? this.settings.allow_groups = 0 : this.settings.allow_groups === !0 && (this.settings.allow_groups = -1), this.filters = this.settings.filters, this.icons = this.settings.icons, this.operators = this.settings.operators, this.templates = this.settings.templates, this.plugins = this.settings.plugins, void 0 === g.regional.en && l.error("Config", '"i18n/en.js" not loaded.'), this.lang = $.extendext(!0, "replace", {}, g.regional.en, g.regional[this.settings.lang_code], this.settings.lang), Object.keys(this.templates).forEach(function(b) {
                this.templates[b] || (this.templates[b] = g.templates[b]), "string" == typeof this.templates[b] && (this.templates[b] = a.template(this.templates[b]))
            }, this), this.$el.attr("id") || (this.$el.attr("id", "qb_" + Math.floor(99999 * Math.random())), this.status.generated_id = !0), this.status.id = this.$el.attr("id"), this.$el.addClass("query-builder form-inline"), this.filters = this.checkFilters(this.filters), this.operators = this.checkOperators(this.operators), this.bindEvents(), this.initPlugins(), this.trigger("afterInit"), d.rules ? (this.setRules(d.rules), delete this.settings.rules) : this.setRoot(!0)
        }, g.prototype.checkFilters = function(a) {
            var b = [];
            if (a && 0 !== a.length || l.error("Config", "Missing filters list"), a.forEach(function(a, c) {
                    switch (a.id || l.error("Config", "Missing filter {0} id", c), -1 != b.indexOf(a.id) && l.error("Config", 'Filter "{0}" already defined', a.id), b.push(a.id), a.type ? g.types[a.type] || l.error("Config", 'Invalid type "{0}"', a.type) : a.type = "string", a.input ? "function" != typeof a.input && -1 == g.inputs.indexOf(a.input) && l.error("Config", 'Invalid input "{0}"', a.input) : a.input = "text", a.operators && a.operators.forEach(function(a) {
                        "string" != typeof a && l.error("Config", "Filter operators must be global operators types (string)")
                    }), a.field || (a.field = a.id), a.label || (a.label = a.field), a.optgroup ? (this.status.has_optgroup = !0, this.settings.optgroups[a.optgroup] || (this.settings.optgroups[a.optgroup] = a.optgroup)) : a.optgroup = null, a.input) {
                        case "radio":
                        case "checkbox":
                            (!a.values || a.values.length < 1) && l.error("Config", 'Missing filter "{0}" values', a.id);
                            break;
                        case "select":
                            a.placeholder && (void 0 === a.placeholder_value && (a.placeholder_value = -1), l.iterateOptions(a.values, function(b) {
                                b == a.placeholder_value && l.error("Config", 'Placeholder of filter "{0}" overlaps with one of its values', a.id)
                            }))
                    }
                }, this), this.settings.sort_filters)
                if ("function" == typeof this.settings.sort_filters) a.sort(this.settings.sort_filters);
                else {
                    var c = this;
                    a.sort(function(a, b) {
                        return c.translateLabel(a.label).localeCompare(c.translateLabel(b.label))
                    })
                }
            return this.status.has_optgroup && (a = l.groupSort(a, "optgroup")), a
        }, g.prototype.checkOperators = function(a) {
            var b = [];
            return a.forEach(function(c, d) {
                "string" == typeof c ? (g.OPERATORS[c] || l.error("Config", 'Unknown operator "{0}"', c), a[d] = c = $.extendext(!0, "replace", {}, g.OPERATORS[c])) : (c.type || l.error("Config", 'Missing "type" for operator {0}', d), g.OPERATORS[c.type] && (a[d] = c = $.extendext(!0, "replace", {}, g.OPERATORS[c.type], c)), void 0 !== c.nb_inputs && void 0 !== c.apply_to || l.error("Config", 'Missing "nb_inputs" and/or "apply_to" for operator "{0}"', c.type)), -1 != b.indexOf(c.type) && l.error("Config", 'Operator "{0}" already defined', c.type), b.push(c.type), c.optgroup ? (this.status.has_operator_optgroup = !0, this.settings.optgroups[c.optgroup] || (this.settings.optgroups[c.optgroup] = c.optgroup)) : c.optgroup = null
            }, this), this.status.has_operator_optgroup && (a = l.groupSort(a, "optgroup")), a
        }, g.prototype.bindEvents = function() {
            var a = this;
            this.$el.on("change.queryBuilder", h.group_condition, function() {
                if ($(this).is(":checked")) {
                    var a = $(this).closest(h.group_container);
                    b(a).condition = $(this).val()
                }
            }), this.$el.on("change.queryBuilder", h.rule_filter, function() {
                var c = $(this).closest(h.rule_container);
                b(c).filter = a.getFilterById($(this).val())
            }), this.$el.on("change.queryBuilder", h.rule_operator, function() {
                var c = $(this).closest(h.rule_container);
                b(c).operator = a.getOperatorByType($(this).val())
            }), this.$el.on("click.queryBuilder", h.add_rule, function() {
                var c = $(this).closest(h.group_container);
                a.addRule(b(c))
            }), this.$el.on("click.queryBuilder", h.delete_rule, function() {
                var c = $(this).closest(h.rule_container);
                a.deleteRule(b(c))
            }), 0 !== this.settings.allow_groups && (this.$el.on("click.queryBuilder", h.add_group, function() {
                var c = $(this).closest(h.group_container);
                a.addGroup(b(c))
            }), this.$el.on("click.queryBuilder", h.delete_group, function() {
                var c = $(this).closest(h.group_container);
                a.deleteGroup(b(c))
            })), this.model.on({
                drop: function(b, c) {
                    c.$el.remove(), a.refreshGroupsConditions()
                },
                add: function(b, c, d) {
                    0 === d ? c.$el.prependTo(c.parent.$el.find(">" + h.rules_list)) : c.$el.insertAfter(c.parent.rules[d - 1].$el), a.refreshGroupsConditions()
                },
                move: function(b, c, d, e) {
                    c.$el.detach(), 0 === e ? c.$el.prependTo(d.$el.find(">" + h.rules_list)) : c.$el.insertAfter(d.rules[e - 1].$el), a.refreshGroupsConditions()
                },
                update: function(b, c, d, e, f) {
                    if (c instanceof k) switch (d) {
                        case "error":
                            a.displayError(c);
                            break;
                        case "flags":
                            a.applyRuleFlags(c);
                            break;
                        case "filter":
                            a.updateRuleFilter(c);
                            break;
                        case "operator":
                            a.updateRuleOperator(c, f);
                            break;
                        case "value":
                            a.updateRuleValue(c)
                    } else switch (d) {
                        case "error":
                            a.displayError(c);
                            break;
                        case "flags":
                            a.applyGroupFlags(c);
                            break;
                        case "condition":
                            a.updateGroupCondition(c)
                    }
                }
            })
        }, g.prototype.setRoot = function(a, b, c) {
            a = void 0 === a || a === !0;
            var d = this.nextGroupId(),
                e = $(this.getGroupTemplate(d, 1));
            return this.$el.append(e), this.model.root = new j(null, e), this.model.root.model = this.model, this.model.root.data = b, this.model.root.flags = $.extend({}, this.settings.default_group_flags, c), this.trigger("afterAddGroup", this.model.root), this.model.root.condition = this.settings.default_condition, a && this.addRule(this.model.root), this.model.root
        }, g.prototype.addGroup = function(a, b, c, d) {
            b = void 0 === b || b === !0;
            var e = a.level + 1,
                f = this.trigger("beforeAddGroup", a, b, e);
            if (f.isDefaultPrevented()) return null;
            var g = this.nextGroupId(),
                h = $(this.getGroupTemplate(g, e)),
                i = a.addGroup(h);
            return i.data = c, i.flags = $.extend({}, this.settings.default_group_flags, d), this.trigger("afterAddGroup", i), i.condition = this.settings.default_condition, b && this.addRule(i), i
        }, g.prototype.deleteGroup = function(a) {
            if (a.isRoot()) return !1;
            var b = this.trigger("beforeDeleteGroup", a);
            if (b.isDefaultPrevented()) return !1;
            var c = !0;
            return a.each("reverse", function(a) {
                c &= this.deleteRule(a)
            }, function(a) {
                c &= this.deleteGroup(a)
            }, this), c && (a.drop(), this.trigger("afterDeleteGroup")), c
        }, g.prototype.updateGroupCondition = function(a) {
            a.$el.find(">" + h.group_condition).each(function() {
                var b = $(this);
                b.prop("checked", b.val() === a.condition), b.parent().toggleClass("active", b.val() === a.condition)
            }), this.trigger("afterUpdateGroupCondition", a)
        }, g.prototype.refreshGroupsConditions = function() {
            ! function a(b) {
                (!b.flags || b.flags && !b.flags.condition_readonly) && b.$el.find(">" + h.group_condition).prop("disabled", b.rules.length <= 1).parent().toggleClass("disabled", b.rules.length <= 1), b.each(function(a) {}, function(b) {
                    a(b)
                }, this)
            }(this.model.root)
        }, g.prototype.addRule = function(a, b, c) {
            var d = this.trigger("beforeAddRule", a);
            if (d.isDefaultPrevented()) return null;
            var e = this.nextRuleId(),
                f = $(this.getRuleTemplate(e)),
                g = a.addRule(f);
            return void 0 !== b && (g.data = b), g.flags = $.extend({}, this.settings.default_rule_flags, c), this.trigger("afterAddRule", g), this.createRuleFilters(g), !this.settings.default_filter && this.settings.display_empty_filter || (g.filter = this.getFilterById(this.settings.default_filter || this.filters[0].id)), g
        }, g.prototype.deleteRule = function(a) {
            if (a.flags.no_delete) return !1;
            var b = this.trigger("beforeDeleteRule", a);
            return b.isDefaultPrevented() ? !1 : (a.drop(), this.trigger("afterDeleteRule"), !0)
        }, g.prototype.createRuleFilters = function(a) {
            var b = this.change("getRuleFilters", this.filters, a),
                c = $(this.getRuleFilterSelect(a, b));
            a.$el.find(h.filter_container).html(c), this.trigger("afterCreateRuleFilters", a)
        }, g.prototype.createRuleOperators = function(a) {
            var b = a.$el.find(h.operator_container).empty();
            if (a.filter) {
                var c = this.getOperators(a.filter),
                    d = $(this.getRuleOperatorSelect(a, c));
                b.html(d), a.__.operator = c[0], this.trigger("afterCreateRuleOperators", a, c)
            }
        }, g.prototype.createRuleInput = function(a) {
            var b = a.$el.find(h.value_container).empty();
            if (a.__.value = void 0, a.filter && a.operator && 0 !== a.operator.nb_inputs) {
                for (var c = this, d = $(), e = a.filter, f = 0; f < a.operator.nb_inputs; f++) {
                    var g = $(this.getRuleInput(a, f));
                    f > 0 && b.append(this.settings.inputs_separator), b.append(g), d = d.add(g)
                }
                b.show(), d.on("change " + (e.input_event || ""), function() {
                    c.status.updating_value = !0, a.value = c.getRuleValue(a), c.status.updating_value = !1
                }), e.plugin && d[e.plugin](e.plugin_config || {}), this.trigger("afterCreateRuleInput", a), void 0 !== e.default_value ? a.value = e.default_value : (c.status.updating_value = !0, a.value = c.getRuleValue(a), c.status.updating_value = !1)
            }
        }, g.prototype.updateRuleFilter = function(a) {
            this.createRuleOperators(a), this.createRuleInput(a), a.$el.find(h.rule_filter).val(a.filter ? a.filter.id : "-1"), this.trigger("afterUpdateRuleFilter", a)
        }, g.prototype.updateRuleOperator = function(a, b) {
            var c = a.$el.find(h.value_container);
            a.operator && 0 !== a.operator.nb_inputs ? (c.show(), (c.is(":empty") || a.operator.nb_inputs !== b.nb_inputs) && this.createRuleInput(a)) : (c.hide(), a.__.value = void 0), a.operator && a.$el.find(h.rule_operator).val(a.operator.type), this.trigger("afterUpdateRuleOperator", a)
        }, g.prototype.updateRuleValue = function(a) {
            this.status.updating_value || this.setRuleValue(a, a.value), this.trigger("afterUpdateRuleValue", a)
        }, g.prototype.applyRuleFlags = function(a) {
            var b = a.flags;
            b.filter_readonly && a.$el.find(h.rule_filter).prop("disabled", !0), b.operator_readonly && a.$el.find(h.rule_operator).prop("disabled", !0), b.value_readonly && a.$el.find(h.rule_value).prop("disabled", !0), b.no_delete && a.$el.find(h.delete_rule).remove(), this.trigger("afterApplyRuleFlags", a)
        }, g.prototype.applyGroupFlags = function(a) {
            var b = a.flags;
            b.condition_readonly && a.$el.find(">" + h.group_condition).prop("disabled", !0).parent().addClass("readonly"), b.no_delete && a.$el.find(h.delete_group).remove(), this.trigger("afterApplyGroupFlags", a)
        }, g.prototype.clearErrors = function(a) {
            a = a || this.model.root, a && (a.error = null, a instanceof j && a.each(function(a) {
                a.error = null
            }, function(a) {
                this.clearErrors(a)
            }, this))
        }, g.prototype.displayError = function(a) {
            if (this.settings.display_errors)
                if (null === a.error) a.$el.removeClass("has-error");
                else {
                    var b = $.extend([], a.error, [this.lang.errors[a.error[0]] || a.error[0]]);
                    a.$el.addClass("has-error").find(h.error_container).eq(0).attr("title", l.fmt.apply(null, b))
                }
        }, g.prototype.triggerValidationError = function(a, b, c) {
            $.isArray(b) || (b = [b]);
            var d = this.trigger("validationError", a, b, c);
            d.isDefaultPrevented() || (a.error = b)
        }, g.prototype.destroy = function() {
            this.trigger("beforeDestroy"), this.status.generated_id && this.$el.removeAttr("id"), this.clear(), this.model = null, this.$el.off(".queryBuilder").removeClass("query-builder").removeData("queryBuilder"), delete this.$el[0].queryBuilder
        }, g.prototype.reset = function() {
            this.status.group_id = 1, this.status.rule_id = 0, this.model.root.empty(), this.addRule(this.model.root), this.trigger("afterReset")
        }, g.prototype.clear = function() {
            this.status.group_id = 0, this.status.rule_id = 0, this.model.root && (this.model.root.drop(), this.model.root = null), this.trigger("afterClear")
        }, g.prototype.setOptions = function(a) {
            $.makeArray($(Object.keys(a)).filter(g.modifiable_options)).forEach(function(b) {
                this.settings[b] = a[b]
            }, this)
        }, g.prototype.getModel = function(a) {
            return a ? b(a) : this.model.root
        }, g.prototype.validate = function() {
            this.clearErrors();
            var a = this,
                b = function c(b) {
                    var d = 0,
                        e = 0;
                    return b.each(function(b) {
                        if (!b.filter) return a.triggerValidationError(b, "no_filter", null), void e++;
                        if (0 !== b.operator.nb_inputs) {
                            var c = a.validateValue(b, b.value);
                            if (c !== !0) return a.triggerValidationError(b, c, b.value), void e++
                        }
                        d++
                    }, function(a) {
                        c(a) ? d++ : e++
                    }), e > 0 ? !1 : 0 !== d || a.settings.allow_empty && b.isRoot() ? !0 : (a.triggerValidationError(b, "empty_group", null), !1)
                }(this.model.root);
            return this.change("validate", b)
        }, g.prototype.getRules = function(a) {
            if (a = $.extend({
                    get_flags: !1
                }, a), !this.validate()) return {};
            var b = this,
                c = function d(c) {
                    var e = {
                        condition: c.condition,
                        rules: []
                    };
                    if (c.data && (e.data = $.extendext(!0, "replace", {}, c.data)), a.get_flags) {
                        var f = b.getGroupFlags(c.flags, "all" === a.get_flags);
                        $.isEmptyObject(f) || (e.flags = f)
                    }
                    return c.each(function(c) {
                        var d = null;
                        0 !== c.operator.nb_inputs && (d = c.value);
                        var f = {
                            id: c.filter.id,
                            field: c.filter.field,
                            type: c.filter.type,
                            input: c.filter.input,
                            operator: c.operator.type,
                            value: d
                        };
                        if ((c.filter.data || c.data) && (f.data = $.extendext(!0, "replace", {}, c.filter.data, c.data)), a.get_flags) {
                            var g = b.getRuleFlags(c.flags, "all" === a.get_flags);
                            $.isEmptyObject(g) || (f.flags = g)
                        }
                        e.rules.push(f)
                    }, function(a) {
                        e.rules.push(d(a))
                    }), e
                }(this.model.root);
            return this.change("getRules", c)
        }, g.prototype.setRules = function(a) {
            $.isArray(a) && (a = {
                condition: this.settings.default_condition,
                rules: a
            }), a && a.rules && (0 !== a.rules.length || this.settings.allow_empty) || l.error("RulesParse", "Incorrect data object passed"), this.clear(), this.setRoot(!1, a.data, this.parseGroupFlags(a)), a = this.change("setRules", a);
            var b = this;
            ! function c(a, d) {
                null !== d && (void 0 === a.condition ? a.condition = b.settings.default_condition : -1 == b.settings.conditions.indexOf(a.condition) && l.error("UndefinedCondition", 'Invalid condition "{0}"', a.condition), d.condition = a.condition, a.rules.forEach(function(a) {
                    var e;
                    if (a.rules && a.rules.length > 0)
                        if (-1 !== b.settings.allow_groups && b.settings.allow_groups < d.level) b.reset(), l.error("RulesParse", "No more than {0} groups are allowed", b.settings.allow_groups);
                        else {
                            if (e = b.addGroup(d, !1, a.data, b.parseGroupFlags(a)), null === e) return;
                            c(a, e)
                        }
                    else {
                        if (void 0 === a.id && l.error("RulesParse", "Missing rule field id"), void 0 === a.operator && (a.operator = "equal"), e = b.addRule(d, a.data), null === e) return;
                        e.filter = b.getFilterById(a.id), e.operator = b.getOperatorByType(a.operator), e.flags = b.parseRuleFlags(a), 0 !== e.operator.nb_inputs && void 0 !== a.value && (e.value = a.value)
                    }
                }))
            }(a, this.model.root)
        }, g.prototype.validateValue = function(a, b) {
            var c = a.filter.validation || {},
                d = !0;
            return d = c.callback ? c.callback.call(this, b, a) : this.validateValueInternal(a, b), this.change("validateValue", d, b, a)
        }, g.prototype.validateValueInternal = function(a, b) {
            var c, d = a.filter,
                e = a.operator,
                f = d.validation || {},
                h = !0;
            b = 1 === a.operator.nb_inputs ? [b] : b;
            for (var i = 0; i < e.nb_inputs; i++) {
                switch (d.input) {
                    case "radio":
                        if (void 0 === b[i]) {
                            h = ["radio_empty"];
                            break
                        }
                        break;
                    case "checkbox":
                        if (void 0 === b[i] || 0 === b[i].length) {
                            h = ["checkbox_empty"];
                            break
                        }
                        if (!e.multiple && b[i].length > 1) {
                            h = ["operator_not_multiple", e.type];
                            break
                        }
                        break;
                    case "select":
                        if (d.multiple) {
                            if (void 0 === b[i] || 0 === b[i].length || d.placeholder && b[i] == d.placeholder_value) {
                                h = ["select_empty"];
                                break
                            }
                            if (!e.multiple && b[i].length > 1) {
                                h = ["operator_not_multiple", e.type];
                                break
                            }
                        } else if (void 0 === b[i] || d.placeholder && b[i] == d.placeholder_value) {
                            h = ["select_empty"];
                            break
                        }
                        break;
                    default:
                        switch (g.types[d.type]) {
                            case "string":
                                if (void 0 === b[i] || 0 === b[i].length) {
                                    h = ["string_empty"];
                                    break
                                }
                                if (void 0 !== f.min && b[i].length < parseInt(f.min)) {
                                    h = ["string_exceed_min_length", f.min];
                                    break
                                }
                                if (void 0 !== f.max && b[i].length > parseInt(f.max)) {
                                    h = ["string_exceed_max_length", f.max];
                                    break
                                }
                                if (f.format && ("string" == typeof f.format && (f.format = new RegExp(f.format)), !f.format.test(b[i]))) {
                                    h = ["string_invalid_format", f.format];
                                    break
                                }
                                break;
                            case "number":
                                if (void 0 === b[i] || isNaN(b[i])) {
                                    h = ["number_nan"];
                                    break
                                }
                                if ("integer" == d.type) {
                                    if (parseInt(b[i]) != b[i]) {
                                        h = ["number_not_integer"];
                                        break
                                    }
                                } else if (parseFloat(b[i]) != b[i]) {
                                    h = ["number_not_double"];
                                    break
                                }
                                if (void 0 !== f.min && b[i] < parseFloat(f.min)) {
                                    h = ["number_exceed_min", f.min];
                                    break
                                }
                                if (void 0 !== f.max && b[i] > parseFloat(f.max)) {
                                    h = ["number_exceed_max", f.max];
                                    break
                                }
                                if (void 0 !== f.step && "any" !== f.step) {
                                    var j = (b[i] / f.step).toPrecision(14);
                                    if (parseInt(j) != j) {
                                        h = ["number_wrong_step", f.step];
                                        break
                                    }
                                }
                                break;
                            case "datetime":
                                if (void 0 === b[i] || 0 === b[i].length) {
                                    h = ["datetime_empty"];
                                    break
                                }
                                if (f.format) {
                                    "moment" in window || l.error("MissingLibrary", "MomentJS is required for Date/Time validation. Get it here http://momentjs.com");
                                    var k = moment(b[i], f.format);
                                    if (!k.isValid()) {
                                        h = ["datetime_invalid", f.format];
                                        break
                                    }
                                    if (f.min && k < moment(f.min, f.format)) {
                                        h = ["datetime_exceed_min", f.min];
                                        break
                                    }
                                    if (f.max && k > moment(f.max, f.format)) {
                                        h = ["datetime_exceed_max", f.max];
                                        break
                                    }
                                }
                                break;
                            case "boolean":
                                if (c = b[i].trim().toLowerCase(), "true" !== c && "false" !== c && "1" !== c && "0" !== c && 1 !== b[i] && 0 !== b[i]) {
                                    h = ["boolean_not_valid"];
                                    break
                                }
                        }
                }
                if (h !== !0) break
            }
            return h
        }, g.prototype.nextGroupId = function() {
            return this.status.id + "_group_" + this.status.group_id++
        }, g.prototype.nextRuleId = function() {
            return this.status.id + "_rule_" + this.status.rule_id++
        }, g.prototype.getOperators = function(a) {
            "string" == typeof a && (a = this.getFilterById(a));
            for (var b = [], c = 0, d = this.operators.length; d > c; c++) {
                if (a.operators) {
                    if (-1 == a.operators.indexOf(this.operators[c].type)) continue
                } else if (-1 == this.operators[c].apply_to.indexOf(g.types[a.type])) continue;
                b.push(this.operators[c])
            }
            return a.operators && b.sort(function(b, c) {
                return a.operators.indexOf(b.type) - a.operators.indexOf(c.type)
            }), this.change("getOperators", b, a)
        }, g.prototype.getFilterById = function(a) {
            if ("-1" == a) return null;
            for (var b = 0, c = this.filters.length; c > b; b++)
                if (this.filters[b].id == a) return this.filters[b];
            l.error("UndefinedFilter", 'Undefined filter "{0}"', a)
        }, g.prototype.getOperatorByType = function(a) {
            if ("-1" == a) return null;
            for (var b = 0, c = this.operators.length; c > b; b++)
                if (this.operators[b].type == a) return this.operators[b];
            l.error("UndefinedOperator", 'Undefined operator "{0}"', a)
        }, g.prototype.getRuleValue = function(a) {
            var b = a.filter,
                c = a.operator,
                d = [];
            if (b.valueGetter) d = b.valueGetter.call(this, a);
            else {
                for (var e = a.$el.find(h.value_container), f = 0; f < c.nb_inputs; f++) {
                    var g, i = l.escapeElementId(a.id + "_value_" + f);
                    switch (b.input) {
                        case "radio":
                            d.push(e.find("[name=" + i + "]:checked").val());
                            break;
                        case "checkbox":
                            g = [], e.find("[name=" + i + "]:checked").each(function() {
                                g.push($(this).val())
                            }), d.push(g);
                            break;
                        case "select":
                            b.multiple ? (g = [], e.find("[name=" + i + "] option:selected").each(function() {
                                g.push($(this).val())
                            }), d.push(g)) : d.push(e.find("[name=" + i + "] option:selected").val());
                            break;
                        default:
                            d.push(e.find("[name=" + i + "]").val())
                    }
                }
                1 === c.nb_inputs && (d = d[0]), b.valueParser && (d = b.valueParser.call(this, a, d))
            }
            return this.change("getRuleValue", d, a)
        }, g.prototype.setRuleValue = function(a, b) {
            var c = a.filter,
                d = a.operator;
            if (c.valueSetter) c.valueSetter.call(this, a, b);
            else {
                var e = a.$el.find(h.value_container);
                b = 1 == d.nb_inputs ? [b] : b;
                for (var f = 0; f < d.nb_inputs; f++) {
                    var g = l.escapeElementId(a.id + "_value_" + f);
                    switch (c.input) {
                        case "radio":
                            e.find("[name=" + g + '][value="' + b[f] + '"]').prop("checked", !0).trigger("change");
                            break;
                        case "checkbox":
                            $.isArray(b[f]) || (b[f] = [b[f]]), b[f].forEach(function(a) {
                                e.find("[name=" + g + '][value="' + a + '"]').prop("checked", !0).trigger("change")
                            });
                            break;
                        default:
                            e.find("[name=" + g + "]").val(b[f]).trigger("change")
                    }
                }
            }
        }, g.prototype.parseRuleFlags = function(a) {
            var b = $.extend({}, this.settings.default_rule_flags);
            return a.readonly && $.extend(b, {
                filter_readonly: !0,
                operator_readonly: !0,
                value_readonly: !0,
                no_delete: !0
            }), a.flags && $.extend(b, a.flags), this.change("parseRuleFlags", b, a)
        }, g.prototype.getRuleFlags = function(a, b) {
            if (b) return $.extend({}, a);
            var c = {};
            return $.each(this.settings.default_rule_flags, function(b, d) {
                a[b] !== d && (c[b] = a[b])
            }), c
        }, g.prototype.parseGroupFlags = function(a) {
            var b = $.extend({}, this.settings.default_group_flags);
            return a.readonly && $.extend(b, {
                condition_readonly: !0,
                no_delete: !0
            }), a.flags && $.extend(b, a.flags), this.change("parseGroupFlags", b, a)
        }, g.prototype.getGroupFlags = function(a, b) {
            if (b) return $.extend({}, a);
            var c = {};
            return $.each(this.settings.default_group_flags, function(b, d) {
                a[b] !== d && (c[b] = a[b])
            }), c
        }, g.prototype.translateLabel = function(a) {
            return "object" == typeof a ? a[this.settings.lang_code] || a.en : a
        }, g.templates.group = '<dl id="{{= it.group_id }}" class="rules-group-container">   <dt class="rules-group-header">     <div class="btn-group pull-right group-actions">       <button type="button" class="btn btn-xs btn-success" data-add="rule">         <i class="{{= it.icons.add_rule }}"></i> {{= it.lang.add_rule }}       </button>       {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }}         <button type="button" class="btn btn-xs btn-success" data-add="group">           <i class="{{= it.icons.add_group }}"></i> {{= it.lang.add_group }}         </button>       {{?}}       {{? it.level>1 }}         <button type="button" class="btn btn-xs btn-danger" data-delete="group">           <i class="{{= it.icons.remove_group }}"></i> {{= it.lang.delete_group }}         </button>       {{?}}     </div>     <div class="btn-group group-conditions">       {{~ it.conditions: condition }}         <label class="btn btn-xs btn-primary">           <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.lang.conditions[condition] || condition }}         </label>       {{~}}     </div>     {{? it.settings.display_errors }}       <div class="error-container"><i class="{{= it.icons.error }}"></i></div>     {{?}}   </dt>   <dd class=rules-group-body>     <ul class=rules-list></ul>   </dd> </dl>', g.templates.rule = '<li id="{{= it.rule_id }}" class="rule-container">   <div class="rule-header">     <div class="btn-group pull-right rule-actions">       <button type="button" class="btn btn-xs btn-danger" data-delete="rule">         <i class="{{= it.icons.remove_rule }}"></i> {{= it.lang.delete_rule }}       </button>     </div>   </div>   {{? it.settings.display_errors }}     <div class="error-container"><i class="{{= it.icons.error }}"></i></div>   {{?}}   <div class="rule-filter-container"></div>   <div class="rule-operator-container"></div>   <div class="rule-value-container"></div> </li>',
        g.templates.filterSelect = '{{ var optgroup = null; }} <select class="form-control" name="{{= it.rule.id }}_filter">   {{? it.settings.display_empty_filter }}     <option value="-1">{{= it.settings.select_placeholder }}</option>   {{?}}   {{~ it.filters: filter }}     {{? optgroup !== filter.optgroup }}       {{? optgroup !== null }}</optgroup>{{?}}       {{? (optgroup = filter.optgroup) !== null }}         <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}">       {{?}}     {{?}}     <option value="{{= filter.id }}">{{= it.translate(filter.label) }}</option>   {{~}}   {{? optgroup !== null }}</optgroup>{{?}} </select>', g.templates.operatorSelect = '{{ var optgroup = null; }} <select class="form-control" name="{{= it.rule.id }}_operator">   {{~ it.operators: operator }}     {{? optgroup !== operator.optgroup }}       {{? optgroup !== null }}</optgroup>{{?}}       {{? (optgroup = operator.optgroup) !== null }}         <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}">       {{?}}     {{?}}     <option value="{{= operator.type }}">{{= it.lang.operators[operator.type] || operator.type }}</option>   {{~}}   {{? optgroup !== null }}</optgroup>{{?}} </select>', g.prototype.getGroupTemplate = function(a, b) {
            var c = this.templates.group({
                builder: this,
                group_id: a,
                level: b,
                conditions: this.settings.conditions,
                icons: this.icons,
                lang: this.lang,
                settings: this.settings
            });
            return this.change("getGroupTemplate", c, b)
        }, g.prototype.getRuleTemplate = function(a) {
            var b = this.templates.rule({
                builder: this,
                rule_id: a,
                icons: this.icons,
                lang: this.lang,
                settings: this.settings
            });
            return this.change("getRuleTemplate", b)
        }, g.prototype.getRuleFilterSelect = function(a, b) {
            var c = this.templates.filterSelect({
                builder: this,
                rule: a,
                filters: b,
                icons: this.icons,
                lang: this.lang,
                settings: this.settings,
                translate: this.translateLabel
            });
            return this.change("getRuleFilterSelect", c, a)
        }, g.prototype.getRuleOperatorSelect = function(a, b) {
            var c = this.templates.operatorSelect({
                builder: this,
                rule: a,
                operators: b,
                icons: this.icons,
                lang: this.lang,
                settings: this.settings,
                translate: this.translateLabel
            });
            return this.change("getRuleOperatorSelect", c, a)
        }, g.prototype.getRuleInput = function(a, b) {
            var c = a.filter,
                d = a.filter.validation || {},
                e = a.id + "_value_" + b,
                f = c.vertical ? " class=block" : "",
                h = "";
            if ("function" == typeof c.input) h = c.input.call(this, a, e);
            else switch (c.input) {
                case "radio":
                case "checkbox":
                    l.iterateOptions(c.values, function(a, b) {
                        h += "<label" + f + '><input type="' + c.input + '" name="' + e + '" value="' + a + '"> ' + b + "</label> "
                    });
                    break;
                case "select":
                    h += '<select class="form-control" name="' + e + '"' + (c.multiple ? " multiple" : "") + ">", c.placeholder && (h += '<option value="' + c.placeholder_value + '" disabled selected>' + c.placeholder + "</option>"), l.iterateOptions(c.values, function(a, b) {
                        h += '<option value="' + a + '">' + b + "</option> "
                    }), h += "</select>";
                    break;
                case "textarea":
                    h += '<textarea class="form-control" name="' + e + '"', c.size && (h += ' cols="' + c.size + '"'), c.rows && (h += ' rows="' + c.rows + '"'), void 0 !== d.min && (h += ' minlength="' + d.min + '"'), void 0 !== d.max && (h += ' maxlength="' + d.max + '"'), c.placeholder && (h += ' placeholder="' + c.placeholder + '"'), h += "></textarea>";
                    break;
                default:
                    switch (g.types[c.type]) {
                        case "number":
                            h += '<input class="form-control" type="number" name="' + e + '"', void 0 !== d.step && (h += ' step="' + d.step + '"'), void 0 !== d.min && (h += ' min="' + d.min + '"'), void 0 !== d.max && (h += ' max="' + d.max + '"'), c.placeholder && (h += ' placeholder="' + c.placeholder + '"'), c.size && (h += ' size="' + c.size + '"'), h += ">";
                            break;
                        default:
                            h += '<input class="form-control" type="text" name="' + e + '"', c.placeholder && (h += ' placeholder="' + c.placeholder + '"'), "string" === c.type && void 0 !== d.min && (h += ' minlength="' + d.min + '"'), "string" === c.type && void 0 !== d.max && (h += ' maxlength="' + d.max + '"'), c.size && (h += ' size="' + c.size + '"'), h += ">"
                    }
            }
            return this.change("getRuleInput", h, a, e)
        }, $.extend(b.prototype, {
            trigger: function(a) {
                return this.$.triggerHandler(a, Array.prototype.slice.call(arguments, 1)), this
            },
            on: function() {
                return this.$.on.apply(this.$, Array.prototype.slice.call(arguments)), this
            },
            off: function() {
                return this.$.off.apply(this.$, Array.prototype.slice.call(arguments)), this
            },
            once: function() {
                return this.$.one.apply(this.$, Array.prototype.slice.call(arguments)), this
            }
        }), b.getModel = function(a) {
            return a ? a instanceof i ? a : $(a).data("queryBuilderModel") : null
        };
    var i = function(a, b) {
        return this instanceof i ? (Object.defineProperty(this, "__", {
            value: {}
        }), b.data("queryBuilderModel", this), this.__.level = 1, this.__.error = null, this.__.data = void 0, this.$el = b, this.id = b[0].id, this.model = null, void(this.parent = a)) : new i
    };
    c(i, ["level", "error", "data", "flags"]), Object.defineProperty(i.prototype, "parent", {
        enumerable: !0,
        get: function() {
            return this.__.parent
        },
        set: function(a) {
            this.__.parent = a, this.level = null === a ? 1 : a.level + 1, this.model = null === a ? null : a.model
        }
    }), i.prototype.isRoot = function() {
        return 1 === this.level
    }, i.prototype.getPos = function() {
        return this.isRoot() ? -1 : this.parent.getNodePos(this)
    }, i.prototype.drop = function() {
        var a = this.model;
        this.isRoot() || this.parent._removeNode(this), null !== a && a.trigger("drop", this)
    }, i.prototype.moveAfter = function(a) {
        return this.isRoot() ? void 0 : (this._move(a.parent, a.getPos() + 1), this)
    }, i.prototype.moveAtBegin = function(a) {
        return this.isRoot() ? void 0 : (void 0 === a && (a = this.parent), this._move(a, 0), this)
    }, i.prototype.moveAtEnd = function(a) {
        return this.isRoot() ? void 0 : (void 0 === a && (a = this.parent), this._move(a, a.length() - 1), this)
    }, i.prototype._move = function(a, b) {
        this.parent._removeNode(this), a._appendNode(this, b, !1), null !== this.model && this.model.trigger("move", this, a, b)
    };
    var j = function(a, b) {
        return this instanceof j ? (i.call(this, a, b), this.rules = [], void(this.__.condition = null)) : new j(a, b)
    };
    j.prototype = Object.create(i.prototype), j.prototype.constructor = j, c(j, ["condition"]), j.prototype.empty = function() {
        this.each("reverse", function(a) {
            a.drop()
        }, function(a) {
            a.drop()
        })
    }, j.prototype.drop = function() {
        this.empty(), i.prototype.drop.call(this)
    }, j.prototype.length = function() {
        return this.rules.length
    }, j.prototype._appendNode = function(a, b, c) {
        return void 0 === b && (b = this.length()), this.rules.splice(b, 0, a), a.parent = this, c && null !== this.model && this.model.trigger("add", a, b), a
    }, j.prototype.addGroup = function(a, b) {
        return this._appendNode(new j(this, a), b, !0)
    }, j.prototype.addRule = function(a, b) {
        return this._appendNode(new k(this, a), b, !0)
    }, j.prototype._removeNode = function(a) {
        var b = this.getNodePos(a);
        return -1 !== b && (a.parent = null, this.rules.splice(b, 1)), this
    }, j.prototype.getNodePos = function(a) {
        return this.rules.indexOf(a)
    }, j.prototype.each = function(a, b, c, d) {
        "function" == typeof a && (d = c, c = b, b = a, a = !1), d = void 0 === d ? null : d;
        for (var e = a ? this.rules.length - 1 : 0, f = a ? 0 : this.rules.length - 1, g = a ? -1 : 1, h = function() {
                return a ? e >= f : f >= e
            }, i = !1; h() && (this.rules[e] instanceof j ? void 0 !== c && (i = c.call(d, this.rules[e]) === !1) : i = b.call(d, this.rules[e]) === !1, !i); e += g);
        return !i
    }, j.prototype.contains = function(a, b) {
        return -1 !== this.getNodePos(a) ? !0 : b ? !this.each(function(a) {
            return !0
        }, function(b) {
            return !b.contains(a, !0)
        }) : !1
    };
    var k = function(a, b) {
        return this instanceof k ? (i.call(this, a, b), this.__.filter = null, this.__.operator = null, this.__.flags = {}, void(this.__.value = void 0)) : new k(a, b)
    };
    k.prototype = Object.create(i.prototype), k.prototype.constructor = k, c(k, ["filter", "operator", "value"]), g.Group = j, g.Rule = k;
    var l = g.utils = {};
    l.iterateOptions = function(a, b) {
        a && ($.isArray(a) ? a.forEach(function(a) {
            $.isPlainObject(a) ? $.each(a, function(a, c) {
                return b(a, c), !1
            }) : b(a, a)
        }) : $.each(a, function(a, c) {
            b(a, c)
        }))
    }, l.fmt = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return a.replace(/{([0-9]+)}/g, function(a, c) {
            return b[parseInt(c)]
        })
    }, l.error = function(a, b) {
        var c = new Error(l.fmt.apply(null, Array.prototype.slice.call(arguments, 1)));
        throw c.name = a + "Error", c.args = Array.prototype.slice.call(arguments, 2), c
    }, l.changeType = function(a, b, c) {
        switch (b) {
            case "integer":
                return parseInt(a);
            case "date":
                return a;    
            case "double":
                return parseFloat(a);
            case "boolean":
                var d = "true" === a.trim().toLowerCase() || "1" === a.trim() || 1 === a;
                return c ? d ? true : false : d;
            default:
                return a
        }
    }, l.escapeString = function(a) {
        return "string" != typeof a ? a : a.replace(/[\0\n\r\b\\\'\"]/g, function(a) {
            switch (a) {
                case "\x00":
                    return "\\0";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\b":
                    return "\\b";
                default:
                    return "\\" + a
            }
        }).replace(/\t/g, "\\t").replace(/\x1a/g, "\\Z")
    }, l.escapeRegExp = function(a) {
        return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
    }, l.escapeElementId = function(a) {
        return a ? a.replace(/(\\)?([:.\[\],])/g, function(a, b, c) {
            return b ? a : "\\" + c
        }) : a
    }, l.groupSort = function(a, b) {
        var c = [],
            d = [];
        return a.forEach(function(a) {
            var e;
            a[b] ? (e = c.lastIndexOf(a[b]), -1 == e ? e = c.length : e++) : e = c.length, c.splice(e, 0, a[b]), d.splice(e, 0, a)
        }), d
    }, $.fn.queryBuilder = function(a) {
        this.length > 1 && l.error("Config", "Unable to initialize on multiple target");
        var b = this.data("queryBuilder"),
            c = "object" == typeof a && a || {};
        return b || "destroy" != a ? (b || this.data("queryBuilder", new g(this, c)), "string" == typeof a ? b[a].apply(b, Array.prototype.slice.call(arguments, 1)) : this) : this
    }, $.fn.queryBuilder.constructor = g, $.fn.queryBuilder.defaults = g.defaults, $.fn.queryBuilder.extend = g.extend, $.fn.queryBuilder.define = g.define, $.fn.queryBuilder.regional = g.regional, g.define("bt-checkbox", function(a) {
        if ("glyphicons" == a.font) {
            var b = document.createElement("style");
            b.innerHTML = '.checkbox input[type=checkbox]:checked + label:after {     font-family: "Glyphicons Halflings";     content: "\\e013"; } .checkbox label:after {     padding-left: 4px;     padding-top: 2px;     font-size: 9px; }', document.body.appendChild(b)
        }
        this.on("getRuleInput.filter", function(b, c, d) {
            var e = c.filter;
            if (("radio" === e.input || "checkbox" === e.input) && !e.plugin) {
                b.value = "", e.colors || (e.colors = {}), e.color && (e.colors._def_ = e.color);
                var f = e.vertical ? ' style="display:block"' : "",
                    g = 0;
                l.iterateOptions(e.values, function(c, h) {
                    var i = e.colors[c] || e.colors._def_ || a.color,
                        j = d + "_" + g++;
                    b.value += "<div" + f + ' class="' + e.input + " " + e.input + "-" + i + '">   <input type="' + e.input + '" name="' + d + '" id="' + j + '" value="' + c + '">   <label for="' + j + '">' + h + "</label> </div>"
                })
            }
        })
    }, {
        font: "glyphicons",
        color: "default"
    }), g.define("bt-selectpicker", function(a) {
        $.fn.selectpicker && $.fn.selectpicker.Constructor || l.error("MissingLibrary", 'Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select'), this.on("afterCreateRuleFilters", function(b, c) {
            c.$el.find(h.rule_filter).removeClass("form-control").selectpicker(a)
        }), this.on("afterCreateRuleOperators", function(b, c) {
            c.$el.find(h.rule_operator).removeClass("form-control").selectpicker(a)
        }), this.on("afterUpdateRuleFilter", function(a, b) {
            b.$el.find(h.rule_filter).selectpicker("render")
        }), this.on("afterUpdateRuleOperator", function(a, b) {
            b.$el.find(h.rule_operator).selectpicker("render")
        })
    }, {
        container: "body",
        style: "btn-inverse btn-xs",
        width: "auto",
        showIcon: !1
    }), g.define("bt-tooltip-errors", function(a) {
        $.fn.tooltip && $.fn.tooltip.Constructor && $.fn.tooltip.Constructor.prototype.fixTitle || l.error("MissingLibrary", 'Bootstrap Tooltip is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com');
        var b = this;
        this.on("getRuleTemplate.filter getGroupTemplate.filter", function(a) {
            var b = $(a.value);
            b.find(h.error_container).attr("data-toggle", "tooltip"), a.value = b.prop("outerHTML")
        }), this.model.on("update", function(c, d, e) {
            "error" == e && b.settings.display_errors && d.$el.find(h.error_container).eq(0).tooltip(a).tooltip("hide").tooltip("fixTitle")
        })
    }, {
        placement: "right"
    }), g.extend({
        setFilters: function(a, b) {
            var c = this;
            void 0 === b && (b = a, a = !1), b = this.checkFilters(b), b = this.change("setFilters", b);
            var d = b.map(function(a) {
                return a.id
            });
            if (a || ! function f(a) {
                    a.each(function(a) {
                        a.filter && -1 === d.indexOf(a.filter.id) && l.error("ChangeFilter", 'A rule is using filter "{0}"', a.filter.id)
                    }, f)
                }(this.model.root), this.filters = b, function g(a) {
                    a.each(!0, function(a) {
                        a.filter && -1 === d.indexOf(a.filter.id) ? a.drop() : (c.createRuleFilters(a), a.$el.find(h.rule_filter).val(a.filter ? a.filter.id : "-1"))
                    }, g)
                }(this.model.root), this.settings.plugins && (this.settings.plugins["unique-filter"] && this.updateDisabledFilters(), this.settings.plugins["bt-selectpicker"] && this.$el.find(h.rule_filter).selectpicker("render")), this.settings.default_filter) try {
                this.getFilterById(this.settings.default_filter)
            } catch (e) {
                this.settings.default_filter = null
            }
            this.trigger("afterSetFilters", b)
        },
        addFilter: function(a, b) {
            void 0 === b || "#end" == b ? b = this.filters.length : "#start" == b && (b = 0), $.isArray(a) || (a = [a]);
            var c = $.extend(!0, [], this.filters);
            parseInt(b) == b ? Array.prototype.splice.apply(c, [b, 0].concat(a)) : this.filters.some(function(a, c) {
                return a.id == b ? (b = c + 1, !0) : void 0
            }) ? Array.prototype.splice.apply(c, [b, 0].concat(a)) : Array.prototype.push.apply(c, a), this.setFilters(c)
        },
        removeFilter: function(a, b) {
            var c = $.extend(!0, [], this.filters);
            "string" == typeof a && (a = [a]), c = c.filter(function(b) {
                return -1 === a.indexOf(b.id)
            }), this.setFilters(b, c)
        }
    }), g.define("filter-description", function(a) {
        "inline" === a.mode ? this.on("afterUpdateRuleFilter", function(b, c) {
            var d = c.$el.find("p.filter-description");
            c.filter && c.filter.description ? (0 === d.length ? (d = $('<p class="filter-description"></p>'), d.appendTo(c.$el)) : d.show(), d.html('<i class="' + a.icon + '"></i> ' + c.filter.description)) : d.hide()
        }) : "popover" === a.mode ? ($.fn.popover && $.fn.popover.Constructor && $.fn.popover.Constructor.prototype.fixTitle || l.error("MissingLibrary", 'Bootstrap Popover is required to use "filter-description" plugin. Get it here: http://getbootstrap.com'), this.on("afterUpdateRuleFilter", function(b, c) {
            var d = c.$el.find("button.filter-description");
            c.filter && c.filter.description ? (0 === d.length ? (d = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="popover"><i class="' + a.icon + '"></i></button>'), d.prependTo(c.$el.find(h.rule_actions)), d.popover({
                placement: "left",
                container: "body",
                html: !0
            }), d.on("mouseout", function() {
                d.popover("hide")
            })) : d.show(), d.data("bs.popover").options.content = c.filter.description, d.attr("aria-describedby") && d.popover("show")) : (d.hide(), d.data("bs.popover") && d.popover("hide"))
        })) : "bootbox" === a.mode && ("bootbox" in window || l.error("MissingLibrary", 'Bootbox is required to use "filter-description" plugin. Get it here: http://bootboxjs.com'), this.on("afterUpdateRuleFilter", function(b, c) {
            var d = c.$el.find("button.filter-description");
            c.filter && c.filter.description ? (0 === d.length && (d = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="bootbox"><i class="' + a.icon + '"></i></button>'), d.prependTo(c.$el.find(h.rule_actions)), d.on("click", function() {
                bootbox.alert(d.data("description"))
            })), d.data("description", c.filter.description)) : d.hide()
        }))
    }, {
        icon: "glyphicon glyphicon-info-sign",
        mode: "popover"
    }), g.defaults({
        operatorOpposites: {
            equal: "not_equal",
            not_equal: "equal",
            "in": "not_in",
            not_in: "in",
            less: "greater_or_equal",
            less_or_equal: "greater",
            greater: "less_or_equal",
            greater_or_equal: "less",
            between: "not_between",
            not_between: "between",
            begins_with: "not_begins_with",
            not_begins_with: "begins_with",
            contains: "not_contains",
            not_contains: "contains",
            ends_with: "not_ends_with",
            not_ends_with: "ends_with",
            is_empty: "is_not_empty",
            is_not_empty: "is_empty",
            is_null: "is_not_null",
            is_not_null: "is_null"
        },
        conditionOpposites: {
            AND: "OR",
            OR: "AND"
        }
    }), g.define("invert", function(a) {
        var c = this;
        this.on("afterInit", function() {
            c.$el.on("click.queryBuilder", "[data-invert=group]", function() {
                var d = $(this).closest(h.group_container);
                c.invert(b(d), a)
            }), a.display_rules_button && a.invert_rules && c.$el.on("click.queryBuilder", "[data-invert=rule]", function() {
                var d = $(this).closest(h.rule_container);
                c.invert(b(d), a)
            })
        }), this.on("getGroupTemplate.filter", function(b, d) {
            var e = $(b.value);
            e.find(h.condition_container).after('<button type="button" class="btn btn-xs btn-default" data-invert="group"><i class="' + a.icon + '"></i> ' + c.lang.invert + "</button>"), b.value = e.prop("outerHTML")
        }), a.display_rules_button && a.invert_rules && this.on("getRuleTemplate.filter", function(b) {
            var d = $(b.value);
            d.find(h.rule_actions).prepend('<button type="button" class="btn btn-xs btn-default" data-invert="rule"><i class="' + a.icon + '"></i> ' + c.lang.invert + "</button>"), b.value = d.prop("outerHTML")
        })
    }, {
        icon: "glyphicon glyphicon-random",
        recursive: !0,
        invert_rules: !0,
        display_rules_button: !1,
        silent_fail: !1
    }), g.extend({
        invert: function(a, b) {
            if (!(a instanceof i)) {
                if (!this.model.root) return;
                b = a, a = this.model.root
            }
            if ("object" != typeof b && (b = {}), void 0 === b.recursive && (b.recursive = !0), void 0 === b.invert_rules && (b.invert_rules = !0), void 0 === b.silent_fail && (b.silent_fail = !1), void 0 === b.trigger && (b.trigger = !0), a instanceof j) {
                if (this.settings.conditionOpposites[a.condition] ? a.condition = this.settings.conditionOpposites[a.condition] : b.silent_fail || l.error("InvertCondition", 'Unknown inverse of condition "{0}"', a.condition), b.recursive) {
                    var c = $.extend({}, b, {
                        trigger: !1
                    });
                    a.each(function(a) {
                        b.invert_rules && this.invert(a, c)
                    }, function(a) {
                        this.invert(a, c)
                    }, this)
                }
            } else if (a instanceof k && a.operator && !a.filter.no_invert)
                if (this.settings.operatorOpposites[a.operator.type]) {
                    var d = this.settings.operatorOpposites[a.operator.type];
                    a.filter.operators && -1 == a.filter.operators.indexOf(d) || (a.operator = this.getOperatorByType(d))
                } else b.silent_fail || l.error("InvertOperator", 'Unknown inverse of operator "{0}"', a.operator.type);
            b.trigger && this.trigger("afterInvert", a, b)
        }
    }), g.defaults({
        mongoOperators: {
            equal: function(a) {
                return a[0]
            },
            not_equal: function(a) {
                return {
                    $ne: a[0]
                }
            },
            "in": function(a) {
                return {
                    $in: a
                }
            },
            not_in: function(a) {
                return {
                    $nin: a
                }
            },
            less: function(a) {
                return {
                    $lt: a[0]
                }
            },
            less_or_equal: function(a) {
                return {
                    $lte: a[0]
                }
            },
            greater: function(a) {
                return {
                    $gt: a[0]
                }
            },
            greater_or_equal: function(a) {
                return {
                    $gte: a[0]
                }
            },
            between: function(a) {
                return {
                    $gte: a[0],
                    $lte: a[1]
                }
            },
            not_between: function(a) {
                return {
                    $lt: a[0],
                    $gt: a[1]
                }
            },
            begins_with: function(a) {
                return {
                    $regex: "^" + l.escapeRegExp(a[0])
                }
            },
            not_begins_with: function(a) {
                return {
                    $regex: "^(?!" + l.escapeRegExp(a[0]) + ")"
                }
            },
            contains: function(a) {
                return {
                    $regex: l.escapeRegExp(a[0])
                }
            },
            not_contains: function(a) {
                return {
                    $regex: "^((?!" + l.escapeRegExp(a[0]) + ").)*$",
                    $options: "s"
                }
            },
            ends_with: function(a) {
                return {
                    $regex: l.escapeRegExp(a[0]) + "$"
                }
            },
            not_ends_with: function(a) {
                return {
                    $regex: "(?<!" + l.escapeRegExp(a[0]) + ")$"
                }
            },
            is_empty: function(a) {
                return ""
            },
            is_not_empty: function(a) {
                return {
                    $ne: ""
                }
            },
            is_null: function(a) {
                return null
            },
            is_not_null: function(a) {
                return {
                    $ne: null
                }
            }
        },
        mongoRuleOperators: {
            $ne: function(a) {
                return a = a.$ne, {
                    val: a,
                    op: null === a ? "is_not_null" : "" === a ? "is_not_empty" : "not_equal"
                }
            },
            eq: function(a) {
                return {
                    val: a,
                    op: null === a ? "is_null" : "" === a ? "is_empty" : "equal"
                }
            },
            $regex: function(a) {
                return a = a.$regex, "^(?!" == a.slice(0, 4) && ")" == a.slice(-1) ? {
                    val: a.slice(4, -1),
                    op: "not_begins_with"
                } : "^((?!" == a.slice(0, 5) && ").)*$" == a.slice(-5) ? {
                    val: a.slice(5, -5),
                    op: "not_contains"
                } : "(?<!" == a.slice(0, 4) && ")$" == a.slice(-2) ? {
                    val: a.slice(4, -2),
                    op: "not_ends_with"
                } : "$" == a.slice(-1) ? {
                    val: a.slice(0, -1),
                    op: "ends_with"
                } : "^" == a.slice(0, 1) ? {
                    val: a.slice(1),
                    op: "begins_with"
                } : {
                    val: a,
                    op: "contains"
                }
            },
            between: function(a) {
                return {
                    val: [a.$gte, a.$lte],
                    op: "between"
                }
            },
            not_between: function(a) {
                return {
                    val: [a.$lt, a.$gt],
                    op: "not_between"
                }
            },
            $in: function(a) {
                return {
                    val: a.$in,
                    op: "in"
                }
            },
            $nin: function(a) {
                return {
                    val: a.$nin,
                    op: "not_in"
                }
            },
            $lt: function(a) {
                return {
                    val: a.$lt,
                    op: "less"
                }
            },
            $lte: function(a) {
                return {
                    val: a.$lte,
                    op: "less_or_equal"
                }
            },
            $gt: function(a) {
                return {
                    val: a.$gt,
                    op: "greater"
                }
            },
            $gte: function(a) {
                return {
                    val: a.$gte,
                    op: "greater_or_equal"
                }
            }
        }
    }), g.extend({
        getMongo: function(a) {
            a = void 0 === a ? this.getRules() : a;
            var b = this;
            return function c(a) {
                if (a.condition || (a.condition = b.settings.default_condition), -1 === ["AND", "OR"].indexOf(a.condition.toUpperCase()) && l.error("UndefinedMongoCondition", 'Unable to build MongoDB query with condition "{0}"', a.condition), !a.rules) return {};
                var d = [];
                a.rules.forEach(function(a) {
                    if (a.rules && a.rules.length > 0) d.push(c(a));
                    else {
                        var e = b.settings.mongoOperators[a.operator],
                            f = b.getOperatorByType(a.operator),
                            g = [];
                        void 0 === e && l.error("UndefinedMongoOperator", 'Unknown MongoDB operation for operator "{0}"', a.operator), 0 !== f.nb_inputs && (a.value instanceof Array || (a.value = [a.value]), a.value.forEach(function(b) {
                            g.push(l.changeType(b, a.type, !1))
                        }));
                        var h = {};
                        h[a.field] = e.call(b, g), d.push(h)
                    }
                });
                var e = {};
                return d.length > 0 && (e["$" + a.condition.toLowerCase()] = d), e
            }(a)
        },
        getRulesFromMongo: function(a) {
            if (void 0 === a || null === a) return null;
            var b = this,
                c = {
                    $and: "AND",
                    $or: "OR"
                };
            return function e(a) {
                var f = Object.keys(a);
                f.length > 1 && l.error("MongoParse", "Invalid MongoDB query format"), c[f[0].toLowerCase()] || l.error("UndefinedMongoCondition", 'Unable to build MongoDB query with condition "{0}"', f[0]);
                var g = a[f[0]],
                    h = [];
                g.forEach(function(a) {
                    var f = Object.keys(a);
                    if (c[f[0].toLowerCase()]) h.push(e(a));
                    else {
                        var g = f[0],
                            i = a[g],
                            j = d(i, g);
                        void 0 === j && l.error("MongoParse", "Invalid MongoDB query format");
                        var k = b.settings.mongoRuleOperators[j];
                        void 0 === k && l.error("UndefinedMongoOperator", 'JSON Rule operation unknown for operator "{0}"', j);
                        var m = k.call(b, i);
                        h.push({
                            id: b.change("getMongoDBFieldID", g, i),
                            field: g,
                            operator: m.op,
                            value: m.val
                        })
                    }
                });
                var i = {};
                return h.length > 0 && (i.condition = c[f[0].toLowerCase()], i.rules = h), i
            }(a)
        },
        setRulesFromMongo: function(a) {
            this.setRules(this.getRulesFromMongo(a))
        }
    }), h.rule_and_group_containers = h.rule_container + ", " + h.group_container, g.define("sortable", function(a) {
        this.on("afterInit", function(a) {
            $.event.props.push("dataTransfer");
            var c, d, f = a.builder;
            f.$el.on("mouseover.queryBuilder", ".drag-handle", function() {
                f.$el.find(h.rule_and_group_containers).attr("draggable", !0)
            }), f.$el.on("mouseout.queryBuilder", ".drag-handle", function() {
                f.$el.find(h.rule_and_group_containers).removeAttr("draggable")
            }), f.$el.on("dragstart.queryBuilder", "[draggable]", function(a) {
                a.stopPropagation(), a.dataTransfer.setData("text", "drag"), d = b(a.target), setTimeout(function() {
                    var a = $('<div class="rule-placeholder">&nbsp;</div>');
                    a.css("min-height", d.$el.height()), c = d.parent.addRule(a, d.getPos()), d.$el.hide()
                }, 0)
            }), f.$el.on("dragenter.queryBuilder", "[draggable]", function(a) {
                a.preventDefault(), a.stopPropagation(), c && e(c, $(a.target))
            }), f.$el.on("dragover.queryBuilder", "[draggable]", function(a) {
                a.preventDefault(), a.stopPropagation()
            }), f.$el.on("drop.queryBuilder", function(a) {
                a.preventDefault(), a.stopPropagation(), e(d, $(a.target))
            }), f.$el.on("dragend.queryBuilder", "[draggable]", function(a) {
                a.preventDefault(), a.stopPropagation(), d.$el.show(), c.drop(), f.$el.find(h.rule_and_group_containers).removeAttr("draggable"), f.trigger("afterMove", d), d = c = null
            })
        }), this.on("parseRuleFlags.filter", function(b) {
            void 0 === b.value.no_sortable && (b.value.no_sortable = a.default_no_sortable)
        }), this.on("afterApplyRuleFlags", function(a, b) {
            b.flags.no_sortable && b.$el.find(".drag-handle").remove()
        }), this.on("parseGroupFlags.filter", function(b) {
            void 0 === b.value.no_sortable && (b.value.no_sortable = a.default_no_sortable)
        }), this.on("afterApplyGroupFlags", function(a, b) {
            b.flags.no_sortable && b.$el.find(".drag-handle").remove()
        }), this.on("getGroupTemplate.filter", function(b, c) {
            if (c > 1) {
                var d = $(b.value);
                d.find(h.condition_container).after('<div class="drag-handle"><i class="' + a.icon + '"></i></div>'), b.value = d.prop("outerHTML")
            }
        }), this.on("getRuleTemplate.filter", function(b) {
            var c = $(b.value);
            c.find(h.rule_header).after('<div class="drag-handle"><i class="' + a.icon + '"></i></div>'), b.value = c.prop("outerHTML")
        })
    }, {
        default_no_sortable: !1,
        icon: "glyphicon glyphicon-sort"
    }), g.defaults({
        sqlOperators: {
            equal: {
                op: "= ?"
            },
            not_equal: {
                op: "!= ?"
            },
            "in": {
                op: "IN(?)",
                sep: ", "
            },
            not_in: {
                op: "NOT IN(?)",
                sep: ", "
            },
            less: {
                op: "< ?"
            },
            less_or_equal: {
                op: "<= ?"
            },
            greater: {
                op: "> ?"
            },
            greater_or_equal: {
                op: ">= ?"
            },
            between: {
                op: "BETWEEN ?",
                sep: " AND "
            },
            not_between: {
                op: "NOT BETWEEN ?",
                sep: " AND "
            },
            begins_with: {
                op: "LIKE ?",
                mod: "{0}%"
            },
            not_begins_with: {
                op: "NOT LIKE(?)",
                mod: "{0}%"
            },
            contains: {
                op: "LIKE ?",
                mod: "%{0}%"
            },
            not_contains: {
                op: "NOT LIKE(?)",
                mod: "%{0}%"
            },
            ends_with: {
                op: "LIKE ?",
                mod: "%{0}"
            },
            not_ends_with: {
                op: "NOT LIKE(?)",
                mod: "%{0}"
            },
            is_empty: {
                op: "= ''"
            },
            is_not_empty: {
                op: "!= ''"
            },
            is_null: {
                op: "= NULL"
            },
            is_not_null: {
                op: "!= NULL"
            }
        },
        sqlRuleOperator: {
            "=": function(a) {
                return {
                    val: a,
                    op: "" === a ? "is_empty" : "equal"
                }
            },
            "!=": function(a) {
                return {
                    val: a,
                    op: "" === a ? "is_not_empty" : "not_equal"
                }
            },
            LIKE: function(a) {
                return "%" == a.slice(0, 1) && "%" == a.slice(-1) ? {
                    val: a.slice(1, -1),
                    op: "contains"
                } : "%" == a.slice(0, 1) ? {
                    val: a.slice(1),
                    op: "ends_with"
                } : "%" == a.slice(-1) ? {
                    val: a.slice(0, -1),
                    op: "begins_with"
                } : void l.error("SQLParse", 'Invalid value for LIKE operator "{0}"', a)
            },
            IN: function(a) {
                return {
                    val: a,
                    op: "in"
                }
            },
            "NOT IN": function(a) {
                return {
                    val: a,
                    op: "not_in"
                }
            },
            "<": function(a) {
                return {
                    val: a,
                    op: "less"
                }
            },
            "<=": function(a) {
                return {
                    val: a,
                    op: "less_or_equal"
                }
            },
            ">": function(a) {
                return {
                    val: a,
                    op: "greater"
                }
            },
            ">=": function(a) {
                return {
                    val: a,
                    op: "greater_or_equal"
                }
            },
            BETWEEN: function(a) {
                return {
                    val: a,
                    op: "between"
                }
            },
            "NOT BETWEEN": function(a) {
                return {
                    val: a,
                    op: "not_between"
                }
            },
            IS: function(a) {
                return null !== a && l.error("SQLParse", "Invalid value for IS operator"), {
                    val: null,
                    op: "is_null"
                }
            },
            "IS NOT": function(a) {
                return null !== a && l.error("SQLParse", "Invalid value for IS operator"), {
                    val: null,
                    op: "is_not_null"
                }
            }
        },
        sqlStatements: {
            question_mark: function() {
                var a = [];
                return {
                    add: function(b, c) {
                        return a.push(c), "?"
                    },
                    run: function() {
                        return a
                    }
                }
            },
            numbered: function(a) {
                (!a || a.length > 1) && (a = "$");
                var b = 0,
                    c = [];
                return {
                    add: function(d, e) {
                        return c.push(e), b++, a + b
                    },
                    run: function() {
                        return c
                    }
                }
            },
            named: function(a) {
                (!a || a.length > 1) && (a = ":");
                var b = {},
                    c = {};
                return {
                    add: function(d, e) {
                        b[d.field] || (b[d.field] = 1);
                        var f = d.field + "_" + b[d.field]++;
                        return c[f] = e, a + f
                    },
                    run: function() {
                        return c
                    }
                }
            }
        },
        sqlRuleStatement: {
            question_mark: function(a) {
                var b = 0;
                return {
                    parse: function(c) {
                        return "?" == c ? a[b++] : c
                    },
                    esc: function(a) {
                        return a.replace(/\?/g, "'?'")
                    }
                }
            },
            numbered: function(a, b) {
                (!b || b.length > 1) && (b = "$");
                var c = new RegExp("^\\" + b + "[0-9]+$"),
                    d = new RegExp("\\" + b + "([0-9]+)", "g");
                return {
                    parse: function(b) {
                        return c.test(b) ? a[b.slice(1) - 1] : b
                    },
                    esc: function(a) {
                        return a.replace(d, "'" + ("$" == b ? "$$" : b) + "$1'")
                    }
                }
            },
            named: function(a, b) {
                (!b || b.length > 1) && (b = ":");
                var c = new RegExp("^\\" + b),
                    d = new RegExp("\\" + b + "(" + Object.keys(a).join("|") + ")", "g");
                return {
                    parse: function(b) {
                        return c.test(b) ? a[b.slice(1)] : b
                    },
                    esc: function(a) {
                        return a.replace(d, "'" + ("$" == b ? "$$" : b) + "$1'")
                    }
                }
            }
        }
    }), g.extend({
        getSQL: function(a, b, c) {
            if (c = void 0 === c ? this.getRules() : c, b = b === !0 ? "\n" : " ", a === !0 && (a = "question_mark"), "string" == typeof a) {
                var d = f(a);
                a = this.settings.sqlStatements[d[1]](d[2])
            }
            var e = this,
                g = function h(c) {
                    if (c.condition || (c.condition = e.settings.default_condition), -1 === ["AND", "OR"].indexOf(c.condition.toUpperCase()) && l.error("UndefinedSQLCondition", 'Unable to build SQL query with condition "{0}"', c.condition), !c.rules) return "";
                    var d = [];
                    return c.rules.forEach(function(c) {
                        if (c.rules && c.rules.length > 0) d.push("(" + b + h(c) + b + ")" + b);
                        else {
                            var f = e.settings.sqlOperators[c.operator],
                                g = e.getOperatorByType(c.operator),
                                i = "";
                             void 0 === f && l.error("UndefinedSQLOperator", 'Unknown SQL operation for operator "{0}"', c.operator), 0 !== g.nb_inputs && (c.value instanceof Array || (c.value = [c.value]), c.value.forEach(function(b, d) {
                                d > 0 && (i += f.sep), "integer" == c.type || "double" == c.type || "boolean" == c.type || "date" == c.type  ? b = l.changeType(b, c.type, !0) : a || (b = l.escapeString(b)), f.mod && (b = l.fmt(f.mod, b)), a ? i += a.add(c, b) : ("string" == c.type && (b = "'" + b + "'"), i += b)
                            })), d.push(c.field + " " + f.op.replace(/\?/, i))
                        }
                    }), d.join(" " + c.condition + b)
                }(c);
            return a ? {
                sql: g,
                params: a.run()
            } : {
                sql: g
            }
        },
        getRulesFromSQL: function(a, b) {
            "SQLParser" in window || l.error("MissingLibrary", "SQLParser is required to parse SQL queries. Get it here https://github.com/mistic100/sql-parser");
            var c = this;
            if ("string" == typeof a && (a = {
                    sql: a
                }), b === !0 && (b = "question_mark"), "string" == typeof b) {
                var d = f(b);
                b = this.settings.sqlRuleStatement[d[1]](a.params, d[2])
            }
            b && (a.sql = b.esc(a.sql)), 0 !== a.sql.toUpperCase().indexOf("SELECT") && (a.sql = "SELECT * FROM table WHERE " + a.sql);
            var e = SQLParser.parse(a.sql);
            e.where || l.error("SQLParse", "No WHERE clause found");
            var g = {
                    condition: this.settings.default_condition,
                    rules: []
                },
                h = g;
            return function i(a, d) {
                if (-1 !== ["AND", "OR"].indexOf(a.operation.toUpperCase())) {
                    d > 0 && h.condition != a.operation.toUpperCase() && (h.rules.push({
                        condition: c.settings.default_condition,
                        rules: []
                    }), h = h.rules[h.rules.length - 1]), h.condition = a.operation.toUpperCase(), d++;
                    var e = h;
                    i(a.left, d), h = e, i(a.right, d)
                } else {
                    void 0 !== a.left.value && void 0 !== a.right.value || l.error("SQLParse", "Missing field and/or value"), $.isPlainObject(a.right.value) && l.error("SQLParse", "Value format not supported for {0}.", a.left.value);
                    var f;
                    f = $.isArray(a.right.value) ? a.right.value.map(function(a) {
                        return a.value
                    }) : a.right.value, b && (f = $.isArray(f) ? f.map(b.parse) : b.parse(f));
                    var g = a.operation.toUpperCase();
                    "<>" == g && (g = "!=");
                    var j;
                    j = "NOT LIKE" == g ? c.settings.sqlRuleOperator.LIKE : c.settings.sqlRuleOperator[g], void 0 === j && l.error("UndefinedSQLOperator", 'Invalid SQL operation "{0}".', a.operation);
                    var k = j.call(this, f, a.operation);
                    "NOT LIKE" == g && (k.op = "not_" + k.op);
                    var m = a.left.values.join(".");
                    h.rules.push({
                        id: c.change("getSQLFieldID", m, f),
                        field: m,
                        operator: k.op,
                        value: k.val
                    })
                }
            }(e.where.conditions, 0), g
        },
        setRulesFromSQL: function(a, b) {
            this.setRules(this.getRulesFromSQL(a, b))
        }
    }), g.define("unique-filter", function() {
        this.status.used_filters = {}, this.on("afterUpdateRuleFilter", this.updateDisabledFilters), this.on("afterDeleteRule", this.updateDisabledFilters), this.on("afterCreateRuleFilters", this.applyDisabledFilters), this.on("afterReset", this.clearDisabledFilters), this.on("afterClear", this.clearDisabledFilters)
    }), g.extend({
        updateDisabledFilters: function(a) {
            var b = a ? a.builder : this;
            b.status.used_filters = {}, b.model && (! function c(a) {
                a.each(function(a) {
                    a.filter && a.filter.unique && (b.status.used_filters[a.filter.id] || (b.status.used_filters[a.filter.id] = []), "group" == a.filter.unique && b.status.used_filters[a.filter.id].push(a.parent))
                }, function(a) {
                    c(a)
                })
            }(b.model.root), b.applyDisabledFilters(a))
        },
        clearDisabledFilters: function(a) {
            var b = a ? a.builder : this;
            b.status.used_filters = {}, b.applyDisabledFilters(a)
        },
        applyDisabledFilters: function(a) {
            var b = a ? a.builder : this;
            b.$el.find(h.filter_container + " option").prop("disabled", !1), $.each(b.status.used_filters, function(a, c) {
                0 === c.length ? b.$el.find(h.filter_container + ' option[value="' + a + '"]:not(:selected)').prop("disabled", !0) : c.forEach(function(b) {
                    b.each(function(b) {
                        b.$el.find(h.filter_container + ' option[value="' + a + '"]:not(:selected)').prop("disabled", !0)
                    })
                })
            }), b.settings.plugins && b.settings.plugins["bt-selectpicker"] && b.$el.find(h.rule_filter).selectpicker("render")
        }
    }), g.regional.en = {
        __locale: "English (en)",
        __author: 'Damien "Mistic" Sorel, http://www.strangeplanet.fr',
        add_rule: "Add rule",
        add_group: "Add group",
        delete_rule: "Delete",
        delete_group: "Delete",
        conditions: {
            AND: "AND",
            OR: "OR"
        },
        operators: {
            equal: "equal",
            not_equal: "not equal",
            "in": "in",
            not_in: "not in",
            less: "less",
            less_or_equal: "less or equal",
            greater: "greater",
            greater_or_equal: "greater or equal",
            between: "between",
            not_between: "not between",
            begins_with: "begins with",
            not_begins_with: "doesn't begin with",
            contains: "contains",
            not_contains: "doesn't contain",
            ends_with: "ends with",
            not_ends_with: "doesn't end with",
            is_empty: "is empty",
            is_not_empty: "is not empty",
            is_null: "is null",
            is_not_null: "is not null"
        },
        errors: {
            no_filter: "No filter selected",
            empty_group: "The group is empty",
            radio_empty: "No value selected",
            checkbox_empty: "No value selected",
            select_empty: "No value selected",
            string_empty: "Empty value",
            string_exceed_min_length: "Must contain at least {0} characters",
            string_exceed_max_length: "Must not contain more than {0} characters",
            string_invalid_format: "Invalid format ({0})",
            number_nan: "Not a number",
            number_not_integer: "Not an integer",
            number_not_double: "Not a real number",
            number_exceed_min: "Must be greater than {0}",
            number_exceed_max: "Must be lower than {0}",
            number_wrong_step: "Must be a multiple of {0}",
            datetime_empty: "Empty value",
            datetime_invalid: "Invalid date format ({0})",
            datetime_exceed_min: "Must be after {0}",
            datetime_exceed_max: "Must be before {0}",
            boolean_not_valid: "Not a boolean",
            operator_not_multiple: "Operator {0} cannot accept multiple values"
        },
        invert: "Invert"
    }, g.defaults({
        lang_code: "en"
    })
});
