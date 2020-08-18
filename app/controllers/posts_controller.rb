class PostsController < ApplicationController
  def index  
    @posts = Post.all.order(id: "DESC")
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked then # 3? 
      post.update(checked: false) # A.Recordのupdateで更新。既読していれば「既読を解除するためにfalseへ変更」
    else
      post.update(checked: true) # 既読していなければ「既読にするためtrueへ変更」
    end

    item = Post.find(params[:id])
    render json: { post: item } # post(任意)という形でitemをレスポンスする
  end
end
