
<template>
    <div>
        <header class="flex bg-slate-500 items-center">
            <h1 class="px-10 my-7 font-serif text-3xl text-white grow drop-shadow-md">Cookbook</h1>
            <p class="px-10 text-white grow-0 right-1">Browse | Search | Create</p>
        </header>

        <div class="container mx-auto max-w-4xl">
            <div class="flex flex-row">
                <img class="m-5 max-w-[200px]" src="https://via.placeholder.com/200" />
                <div class="flex flex-col m-5">

                    <label class="block my-10">
                        <span class="text-gray-700">Title</span>
                        <input
                            type="text"
                            class="mt-0 block w-full text-3xl font-bold text-slate-800 grow px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                            placeholder=""
                        />
                    </label>

                    <p class="relative bottom-0 grow-0 text-slate-500 text-right">written by Anoia</p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row">
                <div class="basis-1/3 m-5 border-slate-400">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Ingredients</h3>
                    <ul class="my-3 space-y-1">
                        <li class="border-b-[1px] p-1 border-slate-300">600g Kürbis</li>
                        <li class="border-b-[1px] p-1 border-slate-300">300g Karotte</li>
                        <li class="p-1">200ml Kokosmilch</li>
                    </ul>
                </div>
                <div class="basis-2/3 m-5">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Directions</h3>
                    <div class="flex my-5">
                        <span class="text-3xl p-1 pr-4 text-slate-500">1</span>
                 <label class="
                    w-full">
                <textarea
                  class="
                    mt-0
                    block
                    w-full
                    overflow-auto
                    resize-y
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  rows="2"
                ></textarea>
              </label>
                    </div>
                    <div class="flex my-5">
                        <span class="text-3xl p-1 pr-4 text-slate-500">2</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Labore et dolore magna aliqua.adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>