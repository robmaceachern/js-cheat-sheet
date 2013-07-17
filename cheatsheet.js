
(function() {
    var results;
    this.assert = function assert(value, desc) {
        var li = document.createElement("li");
        li.type = "a";
        li.className = value ? "pass" : "fail";
        li.appendChild(document.createTextNode(desc));
        results.appendChild(li);
        if (!value) {
            li.parentNode.parentNode.className = "fail";
        }
        return li;
    };
    this.test = function test(name, fn) {
        results = document.getElementById("results");
        var li = assert(true, name);
        li.type = "1";
        results = li.appendChild(
            document.createElement("ol"));
        fn();
    };
})();

window.onload = function() {

    test("Javascript types, BONUS-F (Boolean, Object, Number, Undefined, String, Function)", function() {
        
        assert(typeof false === "boolean", 
            "typeof false is " + (typeof false));
        
        assert(typeof 5 === "number", 
            "typeof 5 is " + (typeof 5));

        assert(typeof 5.2 === "number", 
            "typeof 5.2 is " + (typeof 5.2));
        
        assert(typeof "Hello" === "string", 
            'typeof "Hello" is ' + (typeof "Hello"));
        
        assert(typeof function(){console.log('world')}  === "function", 
            "typeof function(){console.log('world')} is " + (typeof function(){console.log('world');}));
        
        assert(typeof [1,2,3] === "object", 
            "typeof [1,2,3] is " + (typeof [1,2,3]));
        
        assert(typeof {num:5} === "object", 
            "typeof {num:5} is " + (typeof {num:5}));
        
        assert(typeof null === "object", 
            "typeof null is " + (typeof null));
        
        assert(typeof undefined === "undefined", 
            "typeof undefined is " + (typeof undefined));
    });
    test("Undefined and null", function() {
        
        assert(typeof neverDeclared == 'undefined', 
            "Variables that have not been declared are undefined");

        var anObj = {};
        assert(typeof anObj.doesntExist == 'undefined', "Object properties that don't exist are undefined");

        var declaredButNotAssigned;
        assert(typeof declaredButNotAssigned == 'undefined', "Declared but unassigned variables are undefined");

        var assignedNull = null;
        
        assert(assignedNull == null, "null is an assigned value used to represent no value");
    });
    test("All about 'this'. Invocation types: RMCAC ('regular', method, constructor, apply, call)", function() {

        // Regular invocation
        function regularInvocation(){
            assert(this == window, 
                "When invoked as a 'regular' function, the function context is the global context");
        };
        regularInvocation();

        // Method invocation
        var myObject = {
            methodInvocation: function(){
                assert(this == myObject, 
                    "When invoked by referencing the function using an object property, the function context is the object");
            }
        };
        myObject.methodInvocation();

        // Constructor invocation
        var MyConstructorFunction = function() {
            this.boolOnNewObject = true;
        };
        var myInstance = new MyConstructorFunction();
        assert(myInstance.boolOnNewObject, 
            "When invoked as a constructor, a new empty object is created and is used as the function context. Note: The new object is returned from the function if there is no explicit return statement.");

        // Invocation with apply
        var differentContext = {};
        function invokedUsingApply(){
            assert(this == differentContext, 
                "Using apply or call, you can specify whatever function context you want");
        };
        invokedUsingApply.apply(differentContext);
    });

    test("Closures", function() {

        var outerValue = "Look at me!";
        function aFunction() {
            assert(outerValue === "Look at me!", 
                "A function can access variables that are external to the function through a closure");
        }
        aFunction();

        var innerFunctionStorage;
        function outerFunction(outerParam) {

            function innerFunction(innerParam) {
                assert(innerParam, 
                    "Function parameters are included in the closure.");
                assert(outerParam && outsideValue,
                    "Variables outside of the function are accessible within the closure.");
                tooLate = "Wowzas";
            }
            innerFunctionStorage = innerFunction;
        }
        var param1 = "Hey what's new?";
        var param2 = "Not much, you?";
        var outsideValue = "That's cool";
        outerFunction(param1);
        innerFunctionStorage(param2);
        var tooLate;
        assert(tooLate === "Wowzas", "All variables in an outer scope (even those declared after the function) are included in the closure");
    });

    test("Prototypes", function() {

        function Person() {
            this.state = 'content';
        };

        Person.prototype.smile = function() {
            this.state = 'smiling';
        };

        Person.prototype.frown = function() {
            this.state = 'frowning';
        };

        var rob = new Person('rob');
        var mallory = new Person('mallory');

        assert(typeof rob.smile === 'function' && typeof mallory.smile === 'function',
            "Defining a prototype method makes it accessible to all instances that are part of the prototype chain");

        rob.smile();
        mallory.frown();        
        assert(rob.state === 'smiling' && mallory.state === 'frowning', 
            "Prototype functions can be used to modify instance state");

        Person.prototype.yawn = function() {
            this.state = 'yawning';
        };
        rob.yawn();
        assert(rob.state === 'yawning', 
            "Object instances get access to new prototype properties even after they have been instantiated");

        assert(rob instanceof Person, 
            "instanceof can be used to identify the constructor used to create an object");

        function Programmer() {};
        Programmer.prototype = new Person();
        var expertProgrammer = new Programmer();
        assert(typeof expertProgrammer.yawn === 'function', 
            "The prototype chain can support behaviour similar to subclassing");
    });

// TODOs
// Currying/partial application
// == vs ===, and truthy/falsey values
// Create a Person class with public/private/privileged members and methods.
// Numeric and math: infinity, NaN
// exceptions
// Timers: setTimeout, setInterval, clearInterval
// Setting defaults idioms
// Type coercion
// Object extension
// Reimplement core functions (ie. Array.filter)
};
