export const entries = [
  {
    title: "Am I using Vue Router correctly?",
    topic: "Vue Router",
    description: "I’m utilizing vue router to manage the routing in vue application, but I’m not sure if there’s a better way to set it up for the project. I’m hoping I could get some thoughts on my implementation and advice.",
    tags: ["JavaScript", "Vue", "PHP", "CSS"],
    user: "Jamal Fox",
    codeSample: `
      <template lang="">
        <div class="home_code_review_wrapper rounded-md p-4">
          <div class="review-header flex">
            <div>
              <p class="text-xl font-bold">Am I using Vue Router correctly?</p>
              <p class="entry-topic mb-2 font-semibold text-paletteBlue">Vue Router</p>
              <div class="filter-group flex flex-wrap mr-2">
                <EntryTag v-for="(tag, index) in tags" :key="index" :label="tag" />
              </div>
            </div>
            <div class="profile-group bg-primary-gradient h-12 w-12 rounded-full flex items-center justify-center ml-auto">
              <font-awesome-icon :icon="['fas', 'user']" class="text-xl" />
            </div>
          </div>
          <div class="review-main mt-2 flex flex-col">
            <p>I’m utilizing vue router to manage the routing in vue application, but I’m not sure if there’s a better way to set it up for the project. I’m hoping I could get some thoughts on my implementation and advice.</p>
          </div>
          <div class="review-code-group">
            <VCodeBlock :code="code" :browserWindow="true" highlightjs label="Hello World" lang="javascript" theme="github-dark" />
          </div>
        </div>
      </template>
    `,
  },
  {
    title: "How to optimize React component rendering?",
    topic: "React",
    description: "I've built a complex React component, but it seems to re-render too often, leading to performance issues. Could someone review my code and suggest improvements?",
    tags: ["JavaScript", "React", "HTML", "CSS"],
    user: "Ava Johnson",
  },
  {
    title: "Best practices for Express middleware?",
    topic: "Express",
    description: "I’m writing middleware for an Express app and want to ensure I'm following best practices. Could someone take a look and provide feedback?",
    tags: ["JavaScript", "Node.js", "Express", "Backend"],
    user: "Liam Smith",
  },
  {
    title: "Handling state in Angular applications?",
    topic: "Angular",
    description: "I'm having trouble managing state in my Angular app. I've tried several methods, but nothing seems efficient. Could someone review my approach?",
    tags: ["JavaScript", "Angular", "TypeScript", "Frontend"],
    user: "Emma Davis",
  },
  {
    title: "Using async/await in Node.js?",
    topic: "Node.js",
    description: "I've been using async/await in my Node.js application but encountering unexpected behavior. Could someone review my code and help troubleshoot?",
    tags: ["JavaScript", "Node.js", "Async", "Backend"],
    user: "Noah Brown",
  },
  {
    title: "CSS Grid vs Flexbox for layout?",
    topic: "CSS",
    description: "I'm designing a responsive layout and can't decide between CSS Grid and Flexbox. Could someone review my code and suggest which method would be better?",
    tags: ["CSS", "HTML", "Responsive Design", "Frontend"],
    user: "Sophia Wilson",
  },
  {
    title: "Implementing authentication in Django?",
    topic: "Django",
    description: "I’m working on a Django project and need to implement user authentication. Could someone review my setup and suggest any improvements?",
    tags: ["Python", "Django", "Authentication", "Backend"],
    user: "Olivia Martinez",
  },
  {
    title: "Optimizing SQL queries in PostgreSQL?",
    topic: "PostgreSQL",
    description: "My SQL queries in PostgreSQL are running slow. I've tried indexing, but it hasn't helped much. Could someone review my queries and provide optimization tips?",
    tags: ["SQL", "PostgreSQL", "Database", "Performance"],
    user: "Ethan Miller",
  },
  {
    title: "Using state hooks correctly in React?",
    topic: "React Hooks",
    description: "I'm new to React Hooks and not sure if I'm using useState and useEffect correctly. Could someone review my implementation?",
    tags: ["JavaScript", "React", "Hooks", "Frontend"],
    user: "Isabella Anderson",
  },
  {
    title: "Setting up Webpack for a Vue project?",
    topic: "Webpack",
    description: "I've set up Webpack for my Vue.js project, but I'm facing some configuration issues. Could someone review my setup and help fix the problems?",
    tags: ["JavaScript", "Vue", "Webpack", "Build Tools"],
    user: "Lucas Thomas",
  },
];
