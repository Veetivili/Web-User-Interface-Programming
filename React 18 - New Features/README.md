
* How a new concurrency works and what is the main difference to old version of React rendering model?  

    > React may start rendering an update, pause in the middle, then continue later. It may even abandon an in-progress render altogether. React guarantees that the UI will appear consistent even if a render is interrupted. To do this, it waits to perform DOM mutations until the end, once the entire tree has been evaluated. With this capability, React can prepare new screens in the background without blocking the main thread. This means the UI can respond immediately to user input even if it’s in the middle of a large rendering task, creating a fluid user experience. 
    <br/>

    >Old react in the other hand was `interruptible;`  in a single, uninterrupted, synchronous transaction. With synchronous rendering, once an update starts rendering, nothing can interrupt it until the user can see the result on screen.

* What is a <Suspence> component and give one example where it 
should be used?  

    >  Suspense works basically like a asynchronius function; waiting for other component to load and displays a fallback component untill the desired component is ready. It should be used when fetching data or if there is need to load all data in components simultaniously.

* When you should use SSR and when not? 

    > For example E-Commerce strore which has many pages of products and is usually dynamic, use server side rendering for these products pages to create html markup so it can be crawled by search engine bots. `Not to use case:` Having a simple website, with not much dynamic content, thus maintaing comes more complex. 

* What is a useTransition() hook and where it should be used?  

    > `useTransition` is a React Hook that lets you update the state without blocking the UI. Let's you mark an update as `non-urgent`, by default all updates are considered as urgent. Using `useTransiton()` in component for example showing search results, so that more urgent UI updates can happen like a text input. 

* What is a useIdhook and where it should be used?  

    > `useId` is a new hook for generating unique IDs on both the client and server, while avoiding hydration mismatches. It is primarily useful for component libraries integrating with accessibility APIs that require unique IDs. Can be used for example in accessability: Password field and hint needs to be linked to each other instead of hard coding (Due possible updates and changing components.)

* A few questions was presented. Did you find some other good new feature. Just name it in here and explain why feature is good one.  

    > `automatic batching` Batching is a performance optimization technique that React 17 (and other prior versions) used to group several state updates into one single re-render instead of re-rendering the component for each state update.

    > This batching was happening only inside React event handlers by default. And state updates inside of asynchronous code, like promises and setTimeout(), or any other events were not batched by default. Now React 18 automatically bathing batches the state updates in all of these.
