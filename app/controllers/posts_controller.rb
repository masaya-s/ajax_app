class PostsController < ApplicationController
  def index  
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked then # 3? 
      post.update(checked: false) # A.Recordのupdateで更新
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item } # post(任意)という形でitemをレスポンスする
  end
end
