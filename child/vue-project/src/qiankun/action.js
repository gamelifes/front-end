function emptyAction() {
    // 提示当前使用的是空 Action
    console.warn("Current execute action is empty!");
}

class Actions {
    // 默认值为空 Action
    actions = {
        onGlobalStateChange: emptyAction,
        setGlobalState: emptyAction,
    };

    /**
     * 设置 actions
     */
    setActions(actions) {
			console.log('++++',actions)
        this.actions = actions;
    }

    /**
     * 映射
     */
    onGlobalStateChange() {
        return this.actions.onGlobalStateChange(...arguments);
    }

    /**
     * 映射
     */
    setGlobalState() {
        return this.actions.setGlobalState(...arguments);
    }
}

const actions = new Actions();
export default actions;

